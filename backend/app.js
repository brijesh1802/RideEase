const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express() 
const connectToDB = require('./db/db')
connectToDB()
const userRoutes = require('./routes/user.route')
const { cookie } = require('express-validator')

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/user', userRoutes)
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = app
