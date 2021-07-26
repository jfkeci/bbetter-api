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
    eventTitle: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    eventDetails: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 250
    },
    eventDate: {
        type: String,
        required: true
    },
    eventType: {
        type: Number,
        required: true,
        min: 1,
        max: 3
    },
    eventChecked: {
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

module.exports = new mongoose.model('Event', EventSchema)