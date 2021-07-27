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
        date: String
    }],
    intentions: [{
        intention: String,
    }]
}, { timestamps: true })

module.exports = new mongoose.model('Habit', HabitSchema)