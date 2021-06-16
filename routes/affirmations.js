const express = require('express')
const router = express.Router()
const Affirmation = require('../models/affirmation')

//POST: CREATE A NEW AFFIRMATION
router.post('/new', (req, res) => {
    affirmation = new Affirmation({
        userId: req.body.userId,
        promptId: req.body.promptId,
        content: req.body.content,
        synced: req.body.synced
    })
    affirmation.save().then(affirmation => {
        res.json(affirmation)
    }).catch(error => {
        res.status(500).send("Affirmation was not stored in the database, error: " + error)
    })
})

//GET: GET ALL AFFIRMATIONS
router.get('/all', async (req, res) => {
    const affirmations = await Affirmation.find()
        .then((affirmations) => res.json(affirmations))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

//GET: GET AFFIRMATION BY ID
router.get('/get/:affirmationId', async (req, res) => {
    const affirmation = await Affirmation.findById(req.params.affirmationId)
    if(!affirmation) res.status(404).send("Affirmation not found")
    else res.json(affirmation)
})

//UPDATE AFFIRMATION BASED ON ID
router.put('/update/:affirmationId', async (req, res) => {
    const updatedAffirmation = await Affirmation.findByIdAndUpdate(
        req.params.affirmationId, {
            userId: req.body.userId,
            promptId: req.body.promptId,
            content: req.body.content,
            synced: req.body.synced
        },
        {new: true}
    )
    if(!updatedAffirmation) res.status(404).send("Affirmation not found")
    else res.json(updatedAffirmation)
})

//DELETE AFFIRMATION
router.delete('/delete/:affirmationId', async (req, res) => {
    const affirmtion = await Affirmation.findByIdAndRemove(req.params.affirmationId)
    if(!affirmtion) res.status(404).send("Affirmation not found")
    else res.json(affirmtion)
})

module.exports = router;