const router = require('express').Router()
const informationController = require('../controllers/information.js')

router.get('/', async (req, res) => {
  res.status(200).json({ success: true, data: 'test' })
})
router.get('/:identifier', informationController.getData)
router.put('/', informationController.updateData)

module.exports = router
