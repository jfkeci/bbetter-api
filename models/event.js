const mongoose = require('mongoose')
const { boolean, date } = require('yup/lib/locale')

/* "EVENT_ID";
"USER_ID";
"EVENT_TYPE";
"EVENT_CONTENT";
"EVENT_DATE_TIME";
"CHECKED"; */

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
        type: Date,
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
    }
}, {timestamps: true})

module.exports = new mongoose.model('Event', EventSchema)