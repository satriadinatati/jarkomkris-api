const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    token: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    created_at: {
        required: true,
        type: String
    },
    expired_at: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('tokens', dataSchema)