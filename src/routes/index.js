const mongoose = require('mongoose')
const router = require('express').Router()
const products = require('./products.js')
const authentication = require('./authentication.js')
const users = require('./users.js')

router.get('/', (req, res) => {
  res.render('pages/index', { baseUrl: req.url, routes: { auth: 'test-login.ejs' } })
})

router.use('/health-check', (req, res) => {
  res.send({ mongoose: mongoose.STATES[mongoose.connection.readyState] })
})
router.use('/products', products)
router.use('/authentication/', authentication)
router.use('/user/', users)

module.exports = router
