const express = require('express')
const router = express.Router()
const Note = require('../models/note')
/* const userVerify = require('./verifyUserToken') */
const adminVerify = require('./verifyAdminToken')


/*------------------------------------------------------------------------------------------ */
/*------------------------------------ADMIN------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */


//POST: ADMIN: CREATE A NEW NOTE
router.post('/admin/new', adminVerify, (req, res) => {

    note = new Note({
        userId: req.body.userId,
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        noteArchived: req.body.noteArchived,
        synced: req.body.synced
    })
    note.save().then(note => {
        res.json(note)
    }).catch(error => {
        res.status(500).send("Note was not stored in the database, error: " + error)
    })

})

//GET: ADMIN: GET ALL NOTES
router.get('/admin/all', adminVerify, async (req, res) => {

    const notes = await Note.find()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET ALL USER NOTES
router.get('/admin/all/:userId', adminVerify, async (req, res) => {

    const notes = await Note.find({ userId: req.params.userId }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET NOTE BY ID
router.get('/admin/get/:noteId', adminVerify, async (req, res) => {

    const note = await Note.findById(req.params.noteId)

    if (!note) return res.status(404).send("Note not found")

    res.json(note)

})

//GET: ADMIN: GET ALL NOTES BASED ON SYNCED STATE
router.get('/admin/all/:synced', adminVerify, async (req, res) => {

    const notes = await Note.find({
        synced: req.params.synced
    }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET ALL USER NOTES BASED ON SYNCED STATE
router.get('/admin/all/:userId/:synced', adminVerify, async (req, res) => {

    const notes = await Note.find({
        userId: req.params.userId,
        synced: req.params.synced
    }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET ALL NOTES BASED ON ARCHIVED STATE
router.get('/admin/all/:archived', adminVerify, async (req, res) => {

    const notes = await Note.find({
        archived: req.params.archived
    }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET ALL USER NOTES BASED ON ARCHIVED STATE
router.get('/admin/all/:userId/:archived', adminVerify, async (req, res) => {

    const notes = await Note.find({
        userId: req.params.userId,
        archived: req.params.archived
    }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: ADMIN: UPDATE NOTE BASED ON ID
router.put('/admin/put/:noteId', adminVerify, async (req, res) => {

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.noteId,
        {
            noteTitle: req.body.noteTitle,
            noteContent: req.body.noteContent,
            noteArchived: req.body.noteArchived,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedNote) return res.status(404).send("Note not found")

    res.json(updatedNote)

})
//PATCH: ADMIN: UPDATE NOTE BASED ON ID
router.patch('/admin/patch/:noteId', adminVerify, async (req, res) => {

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.noteId,
        {
            noteTitle: req.body.noteTitle,
            noteContent: req.body.noteContent,
            noteArchived: req.body.noteArchived,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedNote) return res.status(404).send("Note not found")

    res.json(updatedNote)

})

//DELETE NOTE
router.delete('/admin/delete/:noteId', adminVerify, async (req, res) => {

    const note = await Note.findByIdAndRemove(req.params.noteId)

    if (!note) return res.status(404).send("Note not found")

    res.json(note)

})


/*------------------------------------------------------------------------------------------ */
/*-------------------------------------USER------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */


//POST: USER: CREATE A NEW NOTE
router.post('/new/:userId'/* , userVerify */, (req, res) => {

    note = new Note({
        userId: req.params.userId,
        noteTitle: req.body.noteTitle,
        noteContent: req.body.noteContent,
        noteArchived: req.body.noteArchived,
        synced: req.body.synced
    })
    note.save().then(note => {
        res.json(note)
    }).catch(error => {
        res.status(500).send("Note was not stored in the database, error: " + error)
    })

})

//GET: USER: GET ALL NOTES
router.get('/all/:userId'/* , userVerify */, async (req, res) => {

    const notes = await Note.find({ userId: req.params.userId }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: USER: GET NOTE BY ID
router.get('/get/:noteId/:userId'/* , userVerify */, async (req, res) => {

    const note = await Note.find({
        _id: req.params.noteId,
        userId: req.params.noteId
    }).exec()

    if (!note) return res.status(404).send("Note not found")

    res.json(note)

})

//GET: USER: GET ALL USER NOTES BASED ON SYNCED STATE
router.get('/all/:userId/:synced'/* , userVerify */, async (req, res) => {

    const notes = await Note.find({
        userId: req.params.userId,
        synced: req.params.synced
    }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})
//GET: USER: GET ALL USER NOTES BASED ON ARCHIVED STATE
router.get('/all/:userId/:archived'/* , userVerify */, async (req, res) => {

    const notes = await Note.find({
        userId: req.params.userId,
        archived: req.params.archived
    }).exec()
        .then((notes) => res.json(notes))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: USER: UPDATE NOTE BASED ON ID
router.put('/put/:noteId'/* , userVerify */, async (req, res) => {

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.noteId,
        {
            noteTitle: req.body.noteTitle,
            noteContent: req.body.noteContent,
            noteArchived: req.body.noteArchived,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedNote) return res.status(404).send("Note not found")

    res.json(updatedNote)

})
//PATCH: USER: UPDATE NOTE BASED ON ID
router.patch('/patch/:noteId'/* , userVerify */, async (req, res) => {

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.noteId,
        {
            noteTitle: req.body.noteTitle,
            noteContent: req.body.noteContent,
            noteArchived: req.body.noteArchived,
            synced: req.body.synced
        },
        { new: true }
    )

    if (!updatedNote) return res.status(404).send("Note not found")

    res.json(updatedNote)

})

//DELETE NOTE
router.delete('/delete/:noteId'/* , userVerify */, async (req, res) => {

    const note = await Note.findByIdAndRemove(req.params.noteId)

    if (!note) return res.status(404).send("Note not found")

    res.json(note)

})

//GET: GET SINGLE NOTE BY ID
router.get('/get/:noteId', adminVerify, async (req, res) => {

    const note = await Note.findById(req.params.noteId)

    if (!note) return res.status(404).send("Note not found")

    res.json(note)

})



module.exports = router;