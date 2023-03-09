const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/customers',Controller.showAllCustomers)

  module.exports = router