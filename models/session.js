const mongoose = require('mongoose')

//Session schema
const SessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    sessionLength: {
        type: Number,
        required: true,
        min: 10,
        max: 90
    },
    sessionPoints: {
        type: Number,
        required: true,
        min: 10,
        max: 90
    },
    sessionFinished: {
        type: Boolean,
        required: true
    },
    synced: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
}, { timestamps: true })

module.exports = new mongoose.model('Session', SessionSchema)