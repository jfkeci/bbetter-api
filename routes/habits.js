const express = require('express')
const router = express.Router()
const Habit = require('../models/habit')
const Question = require('../models/question')



//POST: CREATE A NEW HABIT
router.post('/new', async (req, res) => {

    questions = await Question.find()
        .then((questions) => {
            habit = new Habit({
                userId: req.body.userId,
                habitTitle: req.body.habitTitle,
                habitDates: req.body.habitDates,
                intentions: req.body.intentions
            })
            habit.save().then(habit => {
                res.json(habit)
            }).catch(error => {
                res.status(500).send("Habit was not stored in the database, error: " + error)
            })
        })
})

router.get('/all', async (req, res) => {
    const habits = await Habit.find()
        .then((habits) => res.json(habits))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

router.get('/get/:habitId', async (req, res) => {
    const habits = await Habit.findById(req.params.habitId)
        .then((habits) => res.json(habits))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

router.get('/all/:userId', async (req, res) => {
    const habits = await Habit.find({
        userId: req.params.userId
    })
        .then((habits) => res.json(habits))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

//DELETE: ADMIN: DELETE HABIT
router.delete('/delete/:habitId', async (req, res) => {

    const habit = await Habit.findByIdAndRemove(req.params.habitId)

    if (!habit) return res.status(404).send("Habit not found")

    res.json(habit)

})

module.exports = router;