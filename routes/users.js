const express = require('express')
const router = express.Router()
const {User, validateUser} = require('../models/user')

//POST: CREATE A NEW USER
router.post('/new', async (req, res) => {
    const error = await validateUser(req.body)
    if(error.message) res.status(400).send(error.message)

    user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
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

//GET: GET USER BY ID
router.get('/get/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    if(!user) res.status(404).send("User not found")
    else res.send(user)
})

//UPDATE USER BASED ON ID
router.put('/update/:userId', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            age: req.body.age
        },
        {new: true}
    )

    if(!updatedUser) res.status(404).send("User not found")
    else res.send(updatedUser)
})

//DELETE USER
router.delete('/delete/:userId', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.userId)
    if(!user) res.status(404).send("User not found")
    else res.send(user)
})


module.exports = router;