const mongoose = require('mongoose')

//Writing prompt schema
const PromptSchema = new mongoose.Schema({
    promptTitle: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    promptDescription: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 250
    },
    prompt: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 100
    }
}, {timestamps: true})

module.exports = new mongoose.model('Prompt', PromptSchema)