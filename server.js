const express = require('express')
const mongoose = require('mongoose')
const winston = require('winston')
const cors = require('cors')
const app = express()
require ('dotenv').config()
const { createLogger } = require('winston')

app.use(cors())

const usersRoute = require('./routes/users')
const adminsRoute = require('./routes/admins')
const notesRoute = require('./routes/notes')
const eventsRoute = require('./routes/events')
const sessionsRoute = require('./routes/sessions')
const promptsRoute = require('./routes/prompts')


const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//logger
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({all:true})
            )
        }),
        new winston.transports.File({filename: 'error.log', level: 'error'})
    ],
    exceptionHandlers: [
        new winston.transports.File({filename: 'exceptions.log'})
    ]
  });

//routes
app.use('/bbetter/users', usersRoute)
app.use('/bbetter/admins', adminsRoute)
app.use('/bbetter/notes', notesRoute)
app.use('/bbetter/events', eventsRoute)
app.use('/bbetter/sessions', sessionsRoute)
app.use('/bbetter/prompts', promptsRoute)

//connect to mongodb atlas
mongoose
    .connect(
        process.env.DATABASE_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        ).then(()=>{
    logger.info("Connected to mongodb atlas")
}).catch(error => {
    logger.error(error.message)
})

app.listen (PORT, () => {
    logger.info(`Server started at port: ${PORT}`)
})