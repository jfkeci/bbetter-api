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
        minlength: 1,
        maxlength: 40
    },
    email: {
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
    }
},{timestamps:true})

/* const validateUser = user => {
    const schema = yup.object().shape({
        userName: yup.string().required().min(3).max(100),
        authorName: yup.string().required().min(3).max(50),
        authorAge: yup.number().required().min(10, 'Age must be greater than 10').max(100, 'age must be less than 100'),
        userGenre: yup.string().required().min(3).max(30)
    })

    return schema
        .validate(user)
        .then(user => user)
        .catch(error => {
            return{
                message: error.message
            }
        })
} */

module.exports = new mongoose.model('User', UserSchema) //default export

/* exports.User = new mongoose.model('User', UserSchema) //named export */
/* exports.validateUser = validateUser */
