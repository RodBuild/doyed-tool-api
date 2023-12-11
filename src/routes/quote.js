const router = require('express').Router()
const quoteController = require('../controllers/quote.js')

router.post('/', quoteController.createQuoteQuestion)

module.exports = router
