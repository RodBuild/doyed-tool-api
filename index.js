const express = require('express')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const env = require('dotenv')
const port = process.env.PORT || 3000
const router = require('./src/routes')
const connectDB = require('./src/configs/db.js')
// const authentication = require('./src/services/authentication.js')

env.config()
connectDB()
const app = express()

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())
app.use(cors())
// app.use(authentication)
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

app.listen(port, () => console.log(`Running on port ${port}`))
