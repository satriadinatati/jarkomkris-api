const Token =require('../models/Token');
require('dotenv').config();

const auth = async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
        const token = await Token.findOne().where('token').equals(bearerHeader.split(" ")[1]);

        if(!token){
            return res.status(403).json({
                error : true,
                message: "errors",
                data: "forbidden"
            });
        }

        if (token.expired_at < Date.now()) {
            return res.status(403).json({
                error : true,
                message: "token expired",
                data: "forbidden"
            });
        }

        next();
    }else {
        
        res.status(401).json({
            error : true,
            message: "error",
            data: "unauthorized"
        });
    };
}

module.exports = {
    auth: auth
}
