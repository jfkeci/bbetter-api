const express = require('express')
const router = express.Router()
const {Admin, validateAdmin} = require('../models/admin')


//POST: NEW ADMIN
router.post('/new', (req, res) => {
    admin = new Admin({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    })
    admin.save().then(admin => {
        res.json(admin)
    }).catch(error => {
        res.status(500).send("Admin was not stored in the database, error: " + error)
    })
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
    if(!admin) res.status(404).send({
        message: "Admin not found"
    })
    else res.json(admin)
})

//GET: LOGIN ADMIN
router.get('/login/:adminEmail/:adminPassword', async (req, res) => {
    const admin = await Admin.find({
        email: req.params.adminEmail,
        password: req.params.adminPassword
    })
    
    if(!admin) res.status(404).send("Admin not found")
    else res.json(admin)
})

/* //GET: LOGIN ADMIN QUERY
router.get('/login', async (req, res) => {

    const admin = await Admin.find({
        email: req.query.email,
        password: req.query.password
    })
    if(!admin) res.status(404).send("0")
    else res.send(admin)
}) */


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
        {new: true}
    )

    if(!updatedAdmin) res.status(404).send({
        message: "Admin not found"
    })
    else res.json(updatedAdmin)
})

//DELETE ADMIN
router.delete('/delete/:adminId', async (req, res) => {
    const admin = await Admin.findByIdAndRemove(req.params.adminId)
    if(!admin) res.status(404).send({
        message: "Admin not found"
    })
    else res.json(admin)
})


module.exports = router;