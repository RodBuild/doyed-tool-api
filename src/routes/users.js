const router = require('express').Router()
const auth = require('../middlewares/authentication.js')
const usersController = require('../controllers/users.js')

router.get('/profile', auth.loginRequired, usersController.getProfile)
router.post('/profile', auth.loginRequired, usersController.updateProfile)

router.post('/password/reset', auth.loginRequired, usersController.updatePassword)


module.exports = router
