const mongoose = require('mongoose')

//Question schema
const QuestionSchema = new mongoose.Schema({
    questionNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    question: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 510
    },
    answer: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 255
    }
}, {timestamps: true})

module.exports = new mongoose.model('Question', QuestionSchema)