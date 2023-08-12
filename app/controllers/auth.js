const validator = require('fastest-validator');
const User = require('../models/UserAuth');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { cp } = require('fs');
require('dotenv').config();

const login = async (req, res) => {

    try{
        const schema = {
            email: { type: "email", empty: false },
            password: { type: "string", min: 6 }
        }
        const request = {
            email: req.body.email,
            password: req.body.password
        }
    
        const v = new validator();
        const validate = v.validate(request, schema);
    
        if (validate.length) {
            return res.status(400).json({
                message: "error",
                data: validate
            });
        }
    
        const user = await User.findOne().where('email').equals(req.body.email);

        if (user.length === 0) {
            return res.statuss(400).json({
                message: "error",
                data: "email not found"
            });
        }

        // Compare the hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        // Check if the passwords match
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        jwtSecret = process.env.APP_KEY;

        const createtoken = jwt.sign({
            id: user._id,
            email: user.email
        }, jwtSecret);

        const token = new Token({
            token: createtoken,
            email: user.email,
            created_at: new Date(),
            expired_at: Date.now() +(86400000*1),
        });

        await token.save();

        res.status(200).json({ 
            message: "success",
            data: {token: createtoken},
        });

    }catch (e) {

        console.log(e);
        return res.status(500).json({
            message: "Something went wrong",
        });

    }

    
}

const register = async (req, res) => {

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        is_super_admin: req.body.is_super_admin || false,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss')
    };

    const schema = {
        username: {type: "string", max: 250, optional: false},
        email: {type: "email", optional: false},
        password: {type: "string", min: 8, max: 255, optional: false},
    }

    const v = new validator();
    const validate = v.validate(data, schema);
    if (validate.length) {
        return res.status(400).json({
            message: "error",
            data: validate.message
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
        const uniqueEmail = await User.find().where('email').equals(data.email).countDocuments();
        if (uniqueEmail>0) {
            return res.status(400).json({
                message: "error",
                data: "Email sudah digunakan!"
            });
        }
        const user = new User(data);
        await user.save();
        // await users.create(data);
        res.status(201).json({
            message: "success",
            data:"Aku berhasil dibuat!"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "error",
            data: "internal server error"
        });
    }
}

module.exports = {
    login, register
}