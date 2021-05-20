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
    })
    session.save().then(session => {
        res.send(session)
    }).catch(error => {
        res.status(500).send("Session was not stored in the database, error: " + error)
    })
})

//GET: GET ALL SESSIONS
router.get('/all', async (req, res) => {
    const sessions = await Session.find()
        .then((sessions) => res.send(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

//GET: GET SESSION BY ID
router.get('/get/:sessionId', async (req, res) => {
    const session = await Session.findById(req.params.sessionId)
    if(!session) res.status(404).send("Session not found")
    else res.send(session)
})

//UPDATE SESSION BASED ON ID
router.put('/update/:sessionId', async (req, res) => {
    const updatedSession = await Session.findByIdAndUpdate(
        req.params.sessionId, {
            sessionLength: req.body.sessionLength,
            sessionPoints: req.body.sessionPoints,
            sessionFinished: req.body.sessionFinished
        },
        {new: true}
    )
    if(!updatedSession) res.status(404).send("Session not found")
    else res.send(updatedSession)
})

//DELETE SESSION
router.delete('/delete/:sessionId', async (req, res) => {
    const session = await Session.findByIdAndRemove(req.params.sessionId)
    if(!session) res.status(404).send("Session not found")
    else res.send(session)
})


module.exports = router;