const mongoose = require('mongoose')

//Session schema
const SessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    length: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 90
    },
    finished: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

module.exports = new mongoose.model('Session', SessionSchema)