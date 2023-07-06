require("dotenv").config();
module.exports = {
    url: process.env.PTB_DATABASE_URL,
    database: process.env.PTB_DATABASE,
    imgBucket: process.env.PTB_IMAGE_BUCKET,
};