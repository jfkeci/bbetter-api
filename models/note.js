const mongoose = require('mongoose')

//Note schema
const NoteSchema = new mongoose.Schema({
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
    content: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 3000
    }
}, {timestamps: true})

module.exports = new mongoose.model('Note', NoteSchema)