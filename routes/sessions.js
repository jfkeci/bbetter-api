const express = require('express')
const router = express.Router()
const Session = require('../models/session')
const userVerify = require('./verifyUserToken')
const adminVerify = require('./verifyAdminToken')

/*------------------------------------------------------------------------------------------ */
/*------------------------------------ADMIN------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */

//POST: ADMIN: CREATE A NEW SESSION
router.post('/admin/new', adminVerify, (req, res) => {

    session = new Session({
        userId          : req.body.userId,
        sessionLength   : req.body.sessionLength,
        sessionPoints   : req.body.sessionPoints,
        sessionFinished : req.body.sessionFinished,
        synced          : req.body.synced
    })
    session.save().then(session => {
        res.json(session)
    }).catch(error => {
        res.status(500).send("Session was not stored in the database, error: " + error)
    })

})

//GET: ADMIN: GET ALL SESSIONS
router.get('/admin/all', adminVerify, async (req, res) => {

    const sessions = await Session.find()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET SESSION BY ID
router.get('/admin/:sessionId', adminVerify, async (req, res) => {

    const session = await Session.findById(req.params.sessionId)

    if(!session) return res.status(404).send("Session not found")

    res.json(session)

})

//GET: ADMIN: GET ALL SESSIONS FROM USER BASED ON SYNCED STATE
router.get('/admin/all/:synced', adminVerify, async (req, res) => {

    const sessions = await Session.find({
        synced: req.params.synced
    }).exec()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET ALL SESSIONS FROM USER BASED ON SYNCED STATE
router.get('/admin/all/:synced/:userId', adminVerify, async (req, res) => {

    const sessions = await Session.find({
        userId: req.params.userId,
        synced: req.params.synced
    }).exec()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: ADMIN: UPDATE SESSION WITH PUT
router.put('/admin/put/:sessionId', adminVerify, async (req, res) => {

    const updatedSession = await Session.findByIdAndUpdate(
        req.params.sessionId, 
        {
            sessionLength   : req.body.sessionLength,
            sessionPoints   : req.body.sessionPoints,
            sessionFinished : req.body.sessionFinished,
            synced          : req.body.synced
        },
        {new: true}
    )
    if(!updatedSession) return res.status(404).send("Session not found")
    res.json(updatedSession)

})

//PATCH: ADMIN: UPDATE SESSION WITH PATCH
router.patch('/admin/patch/:sessionId', adminVerify, async (req, res) => {

    const updatedSession = await Session.findByIdAndUpdate(
        req.params.sessionId, 
        {
            sessionLength   : req.body.sessionLength,
            sessionPoints   : req.body.sessionPoints,
            sessionFinished : req.body.sessionFinished,
            synced          : req.body.synced
        },
        {new: true}
    )
    if(!updatedSession) return res.status(404).send("Session not found")
    
    res.json(updatedSession)

})

//DELETE: ADMIN: DELETE SESSION
router.delete('/admin/delete/:sessionId', adminVerify, async (req, res) => {

    const session = await Session.findByIdAndRemove(req.params.sessionId)

    if(!session) return res.status(404).send("Session not found")
    
    res.json(session)

})


/*------------------------------------------------------------------------------------------ */
/*-------------------------------------USER------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */


//POST: USER: CREATE SESSION
router.post('/new/:userId', userVerify, (req, res) => {

    session = new Session({
        userId          : req.params.userId,
        sessionLength   : req.body.sessionLength,
        sessionPoints   : req.body.sessionPoints,
        sessionFinished : req.body.sessionFinished,
        synced          : req.body.synced
    })
    session.save().then(session => {
        res.json(session)
    }).catch(error => {
        res.status(500).send("Session was not stored in the database, error: " + error)
    })

})

//GET: USER: GET ALL SESSIONS FROM USER
router.get('/all/:userId', userVerify, async (req, res) => {

    const sessions = await Session.find({userId: req.params.userId}).exec()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: USER: GET SESSION BY ID
router.get('/:sessionId/:userId', userVerify, async (req, res) => {

    const session = await Session.findById(req.params.sessionId)

    if(!session) return res.status(404).send("Session not found")

    res.json(session)

})

//GET: USER: GET ALL SESSIONS FROM USER BASED ON SYNCED STATE
router.get('/all/:userId/:synced', userVerify, async (req, res) => {

    const sessions = await Session.find({
        userId: req.params.userId,
        synced: req.params.synced
    }).exec()
        .then((sessions) => res.json(sessions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: USER: UPDATE USER SESSION BASED ON ID
router.put('/put/:sessionId/:userId', userVerify, async (req, res) => {

    const updatedSession = await Session.findByIdAndUpdate(
        req.params.sessionId, 
        {
            sessionLength   : req.body.sessionLength,
            sessionPoints   : req.body.sessionPoints,
            sessionFinished : req.body.sessionFinished,
            synced          : req.body.synced
        },
        {new: true}
    )

    if(!updatedSession) return res.status(404).send("Session not found")

    res.json(updatedSession)

})

//PATCH: USER: UPDATE USER SESSION BASED ON ID
router.patch('/patch/:sessionId/:userId', userVerify, async (req, res) => {

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

    if(!updatedSession) return res.status(404).send("Session not found")

    res.json(updatedSession)

})

//DELETE: USER: DELETE USER SESSION
router.delete('/delete/:sessionId/:userId', userVerify, async (req, res) => {

    const session = await Session.findByIdAndRemove(req.params.sessionId)
    
    if(!session) return res.status(404).send("Session not found")

    res.json(session)

})


module.exports = router;