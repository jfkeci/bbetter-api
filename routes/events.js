const express = require('express')
const router = express.Router()
const Event = require('../models/event')
const userVerify = require('./verifyUserToken')
const adminVerify = require('./verifyAdminToken')


/*------------------------------------------------------------------------------------------ */
/*------------------------------------ADMIN------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */


//POST: ADMIN: CREATE A NEW EVENT
router.post('/new', adminVerify, (req, res) => {

    event = new Event({
        userId      : req.body.userId,
        eventTitle  : req.body.eventTitle,
        eventDetails: req.body.eventDetails,
        eventDate   : req.body.eventDate,
        eventType   : req.body.eventType,
        eventChecked: req.body.eventChecked,
        synced      : req.body.synced
    })
    event.save().then(event => {
        res.json(event)
    }).catch(error => {
        res.status(500).send("Event was not stored in the database, error: " + error)
    })

})

//GET: ADMIN: GET ALL EVENTS
router.get('/all', adminVerify, async (req, res) => {

    const events = await Event.find()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET ALL USER EVENTS
router.get('/all/:userId/:adminId', adminVerify, async (req, res) => {

    const events = await Event.find({
        userId: req.params.userId
    })
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET SINGLE EVENT BY ID
router.get('/get/:eventId', adminVerify, async (req, res) => {

    const event = await Event.findById(req.params.eventId)

    if(!event) return res.status(404).send("Event not found")

    res.json(event)

})

//GET: ADMIN: GET ALL EVENTS BASED ON SYNCED STATE
router.get('/all/:userId/:synced', adminVerify, async (req, res) => {

    const events = await Event.find({
        synced: req.params.synced
    }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET ALL USER EVENTS BASED ON SYNCED STATE
router.get('/all/:userId/:synced', adminVerify, async (req, res) => {

    const events = await Event.find({
        synced: req.params.synced
    }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: ADMIN: UPDATE EVENT BASED ON ID
router.put('/put/:eventId', adminVerify, async (req, res) => {

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId, 
        {
            eventTitle  : req.body.eventTitle,
            eventDetails: req.body.eventDetails,
            eventDate   : req.body.eventDate,
            eventType   : req.body.eventType,
            eventChecked: req.body.eventChecked,
            synced      : req.body.synced
        },
        {new: true}
    )

    if(!updatedEvent) return res.status(404).send("Event not found")

    res.json(updatedEvent)

})

//PATCH: ADMIN: UPDATE EVENT BASED ON ID
router.patch('/patch/:eventId', adminVerify, async (req, res) => {

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId, 
        {
            eventTitle  : req.body.eventTitle,
            eventDetails: req.body.eventDetails,
            eventDate   : req.body.eventDate,
            eventType   : req.body.eventType,
            eventChecked: req.body.eventChecked,
            synced      : req.body.synced
        },
        {new: true}
    )

    if(!updatedEvent) return res.status(404).send("Event not found")

    res.json(updatedEvent)

})

//DELETE: ADMIN: DELETE EVENT
router.delete('/delete/:eventId', adminVerify, async (req, res) => {

    const event = await Event.findByIdAndRemove(req.params.eventId)

    if(!event) return res.status(404).send("Event not found")

    res.json(event)

})


//GET: ADMIN: GET EVENTS DONE/PENDING
router.get('/all/:checked', adminVerify, async (req, res) => {

    const events = await Event.find({
        eventChecked: req.params.checked
    }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: ADMIN: GET USER EVENTS DONE/PENDING
router.get('/all/:userId/:checked/:adminId', adminVerify, async (req, res) => {

    const events = await Event.find({
        userId      : req.params.userId,
        eventChecked: req.params.checked
    }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})


/*------------------------------------------------------------------------------------------ */
/*-------------------------------------USER------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */


//POST: USER: CREATE A NEW EVENT
router.post('/new/:userId', userVerify, (req, res) => {

    event = new Event({
        userId      : req.params.userId,
        eventTitle  : req.body.eventTitle,
        eventDetails: req.body.eventDetails,
        eventDate   : req.body.eventDate,
        eventType   : req.body.eventType,
        eventChecked: req.body.eventChecked,
        synced      : req.body.synced
    })
    event.save().then(event => {
        res.json(event)
    }).catch(error => {
        res.status(500).send("Event was not stored in the database, error: " + error)
    })

})

//GET: USER: GET ALL EVENTS FROM USER
router.get('/all/:userId', userVerify, async (req, res) => {

    const events = await Event.find({userId: req.params.userId}).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: USER: GET SINGLE EVENT BY ID
router.get('/get/:eventId/:userId', userVerify, async (req, res) => {

    const event = await Event.findById(req.params.eventId)

    if(!event) return res.status(404).send("Event not found")

    res.json(event)

})

//GET: USER: GET ALL USER EVENTS BASED ON SYNCED STATE
router.get('/all/:userId/:synced', userVerify, async (req, res) => {

    const events = await Event.find({
        userId      : req.params.userId,
        synced      : req.params.synced
    }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET: USER: GET ALL USER EVENTS DONE/PENDING
router.get('/all/:userId/:checked', userVerify,  async (req, res) => {

    const events = await Event.find({
        userId      : req.params.userId,
        eventChecked: req.params.checked
    }).exec()
        .then((events) => res.json(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//PUT: ADMIN: UPDATE EVENT BASED ON ID
router.put('/put/:eventId/:userId', userVerify, async (req, res) => {

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId, 
        {
            eventTitle  : req.body.eventTitle,
            eventDetails: req.body.eventDetails,
            eventDate   : req.body.eventDate,
            eventType   : req.body.eventType,
            eventChecked: req.body.eventChecked,
            synced      : req.body.synced
        },
        {new: true}
    )

    if(!updatedEvent) return res.status(404).send("Event not found")

    res.json(updatedEvent)

})

//PATCH: ADMIN: UPDATE EVENT BASED ON ID
router.patch('/patch/:eventId/:userId', userVerify, async (req, res) => {

    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId, 
        {
            eventTitle  : req.body.eventTitle,
            eventDetails: req.body.eventDetails,
            eventDate   : req.body.eventDate,
            eventType   : req.body.eventType,
            eventChecked: req.body.eventChecked,
            synced      : req.body.synced
        },
        {new: true}
    )

    if(!updatedEvent) return res.status(404).send("Event not found")

    res.json(updatedEvent)

})

//DELETE: ADMIN: DELETE EVENT
router.delete('/delete/:eventId/:userId', userVerify, async (req, res) => {

    const event = await Event.findByIdAndRemove(req.params.eventId)

    if(!event) return res.status(404).send("Event not found")

    res.json(event)

})


module.exports = router;