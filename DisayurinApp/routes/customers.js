const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/customers', (req, res) => {
    res.send('Hello World!')
  })

router.get('/customers/:custId', (req, res) => {
    res.send('Hello cust Detail!')
  })

  module.exports = router