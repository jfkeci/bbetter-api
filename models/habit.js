const mongoose = require('mongoose')

//Habit schema
const HabitSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    habitTitle: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 155
    },
    start: {
        type: Number,
        required: true,
        min: 1,
        max: 2
    },
    habitDates: [{
        date: String,
        required: true,
        minlength: 11,
        maxlength: 11
    }],
    intentions: [{
        intention: String,
        required: true,
        minlength: 3,
        maxlength: 155
    }]
}, { timestamps: true })

module.exports = new mongoose.model('Habit', HabitSchema)