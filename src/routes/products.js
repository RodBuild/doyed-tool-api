const router = require('express').Router()
const productsController = require('../controllers/products.js')

router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProduct)
router.post('/', productsController.createProduct)
router.put('/:id', productsController.updateProduct)
router.delete('/:id', productsController.removeProduct)

module.exports = router
