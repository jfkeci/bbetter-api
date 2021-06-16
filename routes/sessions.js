const express = require('express')
const router = express.Router()
const Session = require('../models/session')

//POST: CREATE A NEW SESSIONS
router.post('/new', (req, res) => {
    session = new Session({
        userId: req.body.userId,
        sessionLength: req.body.sessionLength,
        sessionPoints: req.body.sessionPoints,
        sessionFinished: req.body.sessionFinished,
        synced: req.body.synced
    })
    session.save().then(session => {
        res.json(session)
    }).catch(error => {
        res.status(500).send("Session was not stored in the database, error: " + error)
    })
})

//GET: GET ALL SESSIONS
router.get('/all', async (req, res) => {
    const sessions = await Session.find()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

//GET: GET SESSION BY ID
router.get('/get/:sessionId', async (req, res) => {
    const session = await Session.findById(req.params.sessionId)
    if(!session) res.status(404).send("Session not found")
    else res.json(session)
})

//UPDATE SESSION BASED ON ID
router.put('/put/:sessionId', async (req, res) => {
    const updatedSession = await Session.findByIdAndUpdate(
        req.params.sessionId, 
        {
            sessionLength: req.body.sessionLength,
            sessionPoints: req.body.sessionPoints,
            sessionFinished: req.body.sessionFinished,
            synced: req.body.synced
        },
        {new: true}
    )
    if(!updatedSession) res.status(404).send("Session not found")
    else res.json(updatedSession)
})
//UPDATE SESSION BASED ON ID
router.patch('/patch/:sessionId', async (req, res) => {
    const updatedSession = await Session.findByIdAndUpdate(
        req.params.sessionId, 
        {
            sessionLength: req.body.sessionLength,
            sessionPoints: req.body.sessionPoints,
            sessionFinished: req.body.sessionFinished,
            synced: req.body.synced
        },
        {new: true}
    )
    if(!updatedSession) res.status(404).send("Session not found")
    else res.json(updatedSession)
})

//DELETE SESSION
router.delete('/delete/:sessionId', async (req, res) => {
    const session = await Session.findByIdAndRemove(req.params.sessionId)
    if(!session) res.status(404).send("Session not found")
    else res.json(session)
})

//GET: GET ALL SESSIONS FROM USER
router.get('/all/:userId', async (req, res) => {
    const sessions = await Session.find({userId: req.params.userId}).exec()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})
//GET: GET ALL SESSIONS FROM USER BASED ON SYNCED STATE
router.get('/all/:userId/:synced', async (req, res) => {
    const sessions = await Session.find({
        userId: req.params.userId,
        synced: req.params.synced
    }).exec()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})


module.exports = router;