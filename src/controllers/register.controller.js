const User = require('../models/User');
const uuid= require('uuid');
const validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const moment = require('moment');


const store = async (req, res) => {

    const data = {
        id: uuid.v4(),
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
            data: validate
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
                data: "email already exist"
            });
        }
        const user = new User(data);
        await user.save();
        // await users.create(data);
        res.status(201).json({
            message: "success",
            data:"user created"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "error",
            data: "internal server error"
        });
    }
};
module.exports = {
    store
}