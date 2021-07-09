const mongoose = require('mongoose')
const yup = require('yup')


//Admin schema
const AdminSchema = new mongoose.Schema({
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
    userName: {
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
    }
},{timestamps:true})

const validateAdmin = (admin) => {
    const schema = yup.object().shape({
        firstName: yup.string().required().min(1).max(255),
        lastName: yup.string().required().min(1).max(255),
        userName: yup.string().required().min(1).max(40),
        email: yup.string().required().min(5).max(250),
        password: yup.string().required().min(5).max(250),
    })

    return schema
        .validate(admin)
        .then(admin => admin)
        .catch(error => {
            return{
                message: error.message
            }
        })
}


exports.Admin = new mongoose.model('Admin', AdminSchema) //named export
exports.validateAdmin = validateAdmin
