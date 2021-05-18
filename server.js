const express = require('express')
const mongoose = require('mongoose')
const winston = require('winston')
const app = express()
require ('dotenv').config()
const usersRoute = require('./routes/users')
const { createLogger } = require('winston')

const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/api/users', usersRoute)

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
    console.log(`Server started at port: ${PORT}`)
})