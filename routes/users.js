const express = require('express')
const router = express.Router()
const User = require('../models/user')

//POST: CREATE A NEW USER
router.post('/new', (req, res) => {
    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age
    })
    user.save().then(user => {
        res.send(user)
    }).catch(error => {
        res.status(500).send("User was not stored in the database" + error)
    })
})

//GET: GET ALL USERS
router.get('/all', async (req, res) => {
    const users = await User.find()
        .then((users) => res.send(users))
        .catch((error) => {
            res.status(500).send(`Something went wrong getting the data, error: ${error}`)
        })
})

module.exports = router;