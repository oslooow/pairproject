const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/customers',Controller.showAllCustomers)
router.get('/customers/:custId/cart',Controller.cart)
  module.exports = router