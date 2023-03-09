const router = require("express").Router()
const Controller = require("../controllers/index")


router.get('/products',Controller.showAllProducts)
router.get('/products/:productId/detail',Controller.showProductsDetail)
router.get('/products/addProduct',Controller.addProduct)
router.post('/products/addProduct',Controller.saveAddProduct)

module.exports = router