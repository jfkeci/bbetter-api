const mongoose = require('mongoose')

//Habit schema
const HabitSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    habit: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 155
    },
    questionGroup: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    questionNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    questionAnswer: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 155
    }
}, {timestamps: true})

module.exports = new mongoose.model('Habit', HabitSchema)