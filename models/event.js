const mongoose = require('mongoose')
const { boolean, date } = require('yup/lib/locale')

//Event schema
const EventSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    title: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    details: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 250
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    checked: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

module.exports = new mongoose.model('Event', EventSchema)