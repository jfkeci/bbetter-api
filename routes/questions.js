const express = require('express')
const router = express.Router()
const Question = require('../models/question')
const adminVerify = require('./verifyAdminToken')


/*------------------------------------------------------------------------------------------ */
/*------------------------------------ADMIN------------------------------------------------- */
/*------------------------------------------------------------------------------------------ */


//POST:  CREATE A NEW QUESTION
router.post('/new', adminVerify, (req, res) => {

    question = new Question({
        questionNumber  : req.body.questionNumber,
        question: req.body.question,
        answer: ""
    })
    question.save().then(question => {
        res.json(question)
    }).catch(error => {
        res.status(500).send("Question was not stored in the database, error: " + error)
    })

})

//GET:  GET ALL QUESTIONS
router.get('/all', async (req, res) => {

    const questions = await Question.find()
        .then((questions) => res.json(questions))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })

})

//GET:  GET SINGLE QUESTION BY ID
router.get('/get/:qId', async (req, res) => {

    const question = await Question.findById(req.params.qId)

    if(!question) return res.status(404).send("Question not found")

    res.json(question)

})

//GET:  GET QUESTIONS BY NUMBER
router.get('/get/:questionNumber', async (req, res) => {

    const question = await Question.find({
        questionNumber: req.params.questionNumber
    })

    if(!question) return res.status(404).send("Questions not found")

    res.json(question)

})

//PUT:  UPDATE QUESTION BASED ON ID
router.put('/update/:qId', adminVerify, async (req, res) => {

    const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.qId, 
        {
            questionNumber  : req.body.questionNumber,
            question: req.body.question
        },
        {new: true}
    )

    if(!updatedQuestion) return res.status(404).send("Question not found")

    res.json(updatedQuestion)

})

//DELETE:  DELETE QUESTION
router.delete('/delete/:qId', adminVerify, async (req, res) => {

    const question = await Question.findByIdAndRemove(req.params.qId)

    if(!question) return res.status(404).send("Question not found")

    res.json(question)

})


module.exports = router;