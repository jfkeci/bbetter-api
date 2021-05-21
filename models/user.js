const mongoose = require('mongoose')
const Session = require('./session')
const Note = require('./note')
const Event = require('./event')
const yup = require('yup')


//User schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 250
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 250
    },
    gender: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 12,
        max: 120
    },
    userNotesUrl: {
        type: String,
        minlength: 0,
        maxlength: 250
    },
    userEventsUrl: {
        type: String,
        minlength: 0,
        maxlength: 250
    },
    userSessionsUrl: {
        type: String,
        minlength: 0,
        maxlength: 250
    }
},{timestamps:true})

const validateUser = (user) => {
    const schema = yup.object().shape({
        firstName: yup.string().required().min(1).max(255),
        lastName: yup.string().required().min(1).max(255),
        username: yup.string().required().min(1).max(40),
        email: yup.string().required().min(5).max(250),
        password: yup.string().required().min(5).max(250),
        gender: yup.string().required().min(1).max(2),
        age: yup.number().required().min(10).max(120)
    })

    return schema
        .validate(user)
        .then(user => user)
        .catch(error => {
            return{
                message: error.message
            }
        })
}

/* module.exports = new mongoose.model('User', UserSchema) //default export */

exports.User = new mongoose.model('User', UserSchema) //named export
exports.validateUser = validateUser
