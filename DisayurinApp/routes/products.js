const router = require("express").Router()
const Controller = require("../controllers/index")


router.get('/products', (req, res) => {
    res.send('Hello products!')
  })

module.exports = router