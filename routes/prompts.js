const express = require('express')
const router = express.Router()
const Prompt = require('../models/prompt')

//POST: CREATE A NEW PROMPT
router.post('/new', (req, res) => {
    prompt = new Prompt({
        promptTitle: req.body.promptTitle,
        promptDescription: req.body.promptDescription,
        prompt: req.body.prompt
    })
    prompt.save().then(prompt => {
        res.json(prompt)
    }).catch(error => {
        res.status(500).send("Prompt was not stored in the database, error: " + error)
    })
})

//GET: GET ALL PROMPTS
router.get('/all', async (req, res) => {
    const prompts = await Prompt.find()
        .then((prompts) => res.json(prompts))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

//GET: GET PROMPT BY ID
router.get('/get/:promptId', async (req, res) => {
    const prompt = await Prompt.findById(req.params.promptId)
    if(!prompt) res.status(404).send("Prompt not found")
    else res.json(prompt)
})

//UPDATE PROMPT BASED ON ID
router.put('/update/:promptId', async (req, res) => {
    const updatedPrompt = await Prompt.findByIdAndUpdate(
        req.params.promptId, {
            promptTitle: req.body.promptTitle,
            promptDescription: req.body.promptDescription,
            prompt: req.body.prompt
        },
        {new: true}
    )
    if(!updatedPrompt) res.status(404).send("Prompt not found")
    else res.json(updatedPrompt)
})

//DELETE PROMPT
router.delete('/delete/:promptId', async (req, res) => {
    const prompt = await Prompt.findByIdAndRemove(req.params.promptId)
    if(!prompt) res.status(404).send("Prompt not found")
    else res.json(prompt)
})

module.exports = router;