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
    },
    noteArchived: {
        type: Boolean,
        required: true
    },
    synced: {
        type: Number,
        required: true,
        min: 0,
        max: 3
    },
}, { timestamps: true })

module.exports = new mongoose.model('Note', NoteSchema)