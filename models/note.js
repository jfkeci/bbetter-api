const mongoose = require('mongoose')

//Note schema
const NoteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    noteTitle: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50
    },
    noteContent: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 3000
    }
}, {timestamps: true})

module.exports = new mongoose.model('Note', NoteSchema)