const router = require("express").Router()
const Controller = require("../controllers/index")


router.get('/products',Controller.showAllProducts)

router.get('/products/addProducts',Controller.addProduct)

router.post('/products/addProducts',Controller.saveAddProduct)

router.get('/products/:productId/buy',Controller.buy)

router.get('/products/:productId/detail',Controller.showProductsDetail)

router.get('/products/addProduct',Controller.addProduct)

router.post('/products/addProduct',Controller.saveAddProduct)

router.get('/products/:productId/delete',Controller.deleteProductsById)

router.get('/products/:productId/update',Controller.showUpdateForm)

router.post('/products/:productId/update',Controller.saveUpdate)




module.exports = router