const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/admin')
const { validateAdmin, validateAdminLogin } = require('../models/admin')


//POST: NEW ADMIN
router.post('/register', async (req, res) => {

    //Validating the data before saving admin
    const error = await validateAdmin(req.body)
    if (error.message) return res.status(400).send(error.message)

    //Checking if the admin is already in the database
    const emailExists = await Admin.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('Email already exists')

    //Checking if the adminName is already in the database
    const adminNameExists = await Admin.findOne({ userName: req.body.userName })
    if (adminNameExists) return res.status(400).send('Username already exists')

    //Hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    admin = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
    })
    admin.save().then(admin => {
        res.json(admin)
    }).catch(error => {
        res.status(500).send("Admin was not stored in the database, error: " + error)
    })
})

//POST: JWT LOGIN ADMIN
router.post('/login', async (req, res) => {

    req.body.name = 'admin'

    //Validating admin email and password
    const error = await validateAdminLogin(req.body)
    if (error.message) return res.status(400).send(error.message)

    //Checking if the admin email exists
    const admin = await Admin.findOne({ email: req.body.email })
    if (!admin) return res.status(400).send('Email or password is wrong')

    //Checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if (!validPass) return res.status(400).send('Email or password is wrong')

    //Create and assign a token
    const token = jwt.sign({ _id: admin._id }, process.env.ADMIN_TOKEN_SECRET)
    res.header('auth-token', token).send(token)

})

//GET: GET ALL ADMINS
router.get('/all', async (req, res) => {
    const admins = await Admin.find()
        .then((admins) => res.json(admins))
        .catch((error) => {
            res.status(500).send({
                message: `Something went wrong getting the data, error: ${error}`
            })
        })
})

//GET: GET ADMIN BY ID
router.get('/get/:adminId', async (req, res) => {
    const admin = await Admin.findById(req.params.adminId)
    if (!admin) res.status(404).send({
        message: "Admin not found"
    })
    else res.json(admin)
})




//UPDATE ADMIN BASED ON ID
router.put('/update/:adminId', async (req, res) => {
    const updatedAdmin = await Admin.findByIdAndUpdate(
        req.params.adminId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    },
        { new: true }
    )

    if (!updatedAdmin) res.status(404).send({
        message: "Admin not found"
    })
    else res.json(updatedAdmin)
})

//DELETE ADMIN
router.delete('/delete/:adminId', async (req, res) => {
    const admin = await Admin.findByIdAndRemove(req.params.adminId)
    if (!admin) res.status(404).send({
        message: "Admin not found"
    })
    else res.json(admin)
})


module.exports = router;