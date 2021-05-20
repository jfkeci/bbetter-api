const express = require('express')
const router = express.Router()
const Event = require('../models/event')

//POST: CREATE A NEW EVENT
router.post('/new', (req, res) => {
    event = new Event({
        userId: req.body.userId,
        eventTitle: req.body.eventTitle,
        eventDetails: req.body.eventDetails,
        eventDate: req.body.eventDate,
        eventType: req.body.eventType,
        eventChecked: req.body.eventChecked
    })
    event.save().then(event => {
        res.send(event)
    }).catch(error => {
        res.status(500).send("Event was not stored in the database, error: " + error)
    })
})

//GET: GET ALL EVENTS
router.get('/all', async (req, res) => {
    const events = await Event.find()
        .then((events) => res.send(events))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

//GET: GET EVENT BY ID
router.get('/get/:eventId', async (req, res) => {
    const event = await Event.findById(req.params.eventId)
    if(!event) res.status(404).send("Event not found")
    else res.send(event)
})

//UPDATE EVENT BASED ON ID
router.put('/update/:eventId', async (req, res) => {
    const updatedEvent = await Event.findByIdAndUpdate(
        req.params.eventId, {
            eventTitle: req.body.eventTitle,
            eventDetails: req.body.eventDetails,
            eventDate: req.body.eventDate,
            eventType: req.body.eventType,
            eventChecked: req.body.eventChecked
        },
        {new: true}
    )
    if(!updatedEvent) res.status(404).send("Event not found")
    else res.send(updatedEvent)
})

//DELETE EVENT
router.delete('/delete/:eventId', async (req, res) => {
    const event = await Event.findByIdAndRemove(req.params.eventId)
    if(!event) res.status(404).send("Event not found")
    else res.send(event)
})


module.exports = router;