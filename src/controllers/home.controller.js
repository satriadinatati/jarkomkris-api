const User = require('../models/User');
const validator = require('fastest-validator');
const mongoose = require('mongoose');


const index = async (req, res) => {

    try {
        const db = mongoose.connection;
        const churches = db.collection('churches');
        const articles = db.collection('articles');

        const total_gereja = await churches.countDocuments();
        const all_articles = await db.collection('articles').find().limit(10).toArray();        

        res.status(200).json({
            message: "success",
            data: {
                "total_gereja": total_gereja,
                "provinsi_terdaftar": 34,
                "total_jemaat": 1000,
                "articles": all_articles
            }
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
    index
}