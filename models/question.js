const mongoose = require('mongoose')

//Question schema
const QuestionSchema = new mongoose.Schema({
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
    question: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 510
    }
}, {timestamps: true})

module.exports = new mongoose.model('Question', QuestionSchema)