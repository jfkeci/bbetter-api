const express = require('express')
const router = express.Router()
const Note = require('../models/note')

//POST: CREATE A NEW NOTE
router.post('/new', (req, res) => {
    note = new Note({
        userId: req.body.userId,
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        noteArchived: req.body.noteArchived
    })
    note.save().then(note => {
        res.json(note)
    }).catch(error => {
        res.status(500).send("Note was not stored in the database, error: " + error)
    })
})

//GET: GET ALL NOTES
router.get('/all', async (req, res) => {
    const notes = await Note.find()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

//GET: GET NOTE BY ID
router.get('/get/:noteId', async (req, res) => {
    const note = await Note.findById(req.params.noteId)
    if(!note) res.status(404).send("Note not found")
    else res.json(note)
})

//UPDATE NOTE BASED ON ID
router.put('/update/:noteId', async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.noteId, {
            noteTitle: req.body.noteTitle,
            noteContent: req.body.noteContent,
            noteArchived: req.body.noteArchived
        },
        {new: true}
    )
    if(!updatedNote) res.status(404).send("Note not found")
    else res.json(updatedNote)
})

//DELETE NOTE
router.delete('/delete/:noteId', async (req, res) => {
    const note = await Note.findByIdAndRemove(req.params.noteId)
    if(!note) res.status(404).send("Note not found")
    else res.json(note)
})


module.exports = router;