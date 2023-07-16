const router = require('express').Router()
const usersController = require('../controllers/authentication.js')
const auth = require('../middlewares/authentication.js')

router.post('/login', usersController.userLogin)
router.post('/logout', usersController.userLogout)
router.post('/register', auth.accountExists, usersController.userRegister)

module.exports = router
