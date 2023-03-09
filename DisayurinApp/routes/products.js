const router = require("express").Router()
const Controller = require("../controllers/index")


router.get('/products',Controller.showAllProducts)
router.get('/products/:productId/detail',Controller.showProductsDetail)

module.exports = router