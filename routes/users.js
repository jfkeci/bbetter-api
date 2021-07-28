const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminVerify = require('./verifyAdminToken')

const User = require('../models/user')
const { validateUser, validateLogin } = require('../models/user')


//POST: CREATE A NEW USER
router.post('/register', async (req, res) => {

    //Validating the data before saving user
    const error = await validateUser(req.body)
    if (error.message) return res.status(400).send(error.message)

    //Checking if the user is already in the database
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('Email already exists')

    //Checking if the userName is already in the database
    const userNameExists = await User.findOne({ userName: req.body.userName })
    if (userNameExists) return res.status(400).send('Username already exists')

    /* //Hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt) */

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age,
        userNotesUrl: "",
        userEventsUrl: "",
        userSessionsUrl: ""
    })
    user.save().then(async (user) => {

        const uid = user._id;
        const notesUrl = process.env.BASE_URL + "notes/all/" + uid;
        const eventsUrl = process.env.BASE_URL + "events/all/" + uid;
        const sessionsUrl = process.env.BASE_URL + "sessions/all/" + uid;

        const updatedUser = await User.findByIdAndUpdate(
            uid, {
            userNotesUrl: notesUrl,
            userEventsUrl: eventsUrl,
            userSessionsUrl: sessionsUrl
        },
            { new: true }
        )

        res.json(updatedUser)

    }).catch(error => {
        res.status(500).send({
            message: "User was not stored in the database" + error
        })
    })

})

/* //POST: JWT LOGIN USER
router.post('/login', async (req, res) => {

    req.body.name = 'user'

    //Validating user email and password
    const error = await validateLogin(req.body)
    if(error.message) return res.status(400).send(error.message)

    //Checking if the user email exists
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email or password is wrong')

    //Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Email or password is wrong')

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.USER_TOKEN_SECRET)
    res.header('auth-token', token).send(token)

}) */

//GET: LOGIN USER
router.get('/login/:userEmail/:userPassword', async (req, res) => {
    const user = await User.find({
        email: req.params.userEmail,
        password: req.params.userPassword
    }).exec()

    if (!user) res.status(404).send("User not found")
    else res.json(user)
})

//GET: GET ALL USERS
router.get('/admin/all', adminVerify, async (req, res) => {
    const users = await User.find()
        .then((users) => res.json(users))
        .catch((error) => {
            res.status(500).send({
                message: `Something went wrong getting the data, error: ${error}`
            })
        })
})

//GET: GET ALL USERS
router.get('/all', async (req, res) => {
    const users = await User.find()
        .then((users) => res.json(users))
        .catch((error) => {
            res.status(500).send({
                message: `Something went wrong getting the data, error: ${error}`
            })
        })
})

//GET: GET SINGLE USER
router.get('/get/:userId', async (req, res) => {
    const users = await User.find({ _id: req.params.userId }).exec()
        .then((users) => res.json(users))
        .catch((error) => {
            res.status(500).send({
                message: `Something went wrong getting the data, error: ${error}`
            })
        })
})

//GET: GET USER BY ID
router.get('/admin/get/:userId', adminVerify, async (req, res) => {
    const user = await User.findById(req.params.userId)
    if (!user) res.status(404).send({
        message: "User not found"
    })
    else res.json(user)
})

//UPDATE USER BASED ON ID
router.put('/admin/update/:userId', /* adminVerify, */ async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        gender: req.body.gender,
        age: req.body.age
    },
        { new: true }
    )

    if (!updatedUser) res.status(404).send({
        message: "User not found"
    })
    else res.json(updatedUser)
})

//DELETE USER
router.delete('/admin/delete/:userId', adminVerify, async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.userId)
    if (!user) res.status(404).send({
        message: "User not found"
    })
    else res.json(user)
})



module.exports = router;