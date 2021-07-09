const mongoose = require('mongoose')

//Affirmation schema
const AffirmationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    promptId: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 250
    },
    content: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 100
    },
    synced: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
}, {timestamps: true})

module.exports = new mongoose.model('Affirmation', PromptSchema)
