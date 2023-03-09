const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/register',Controller.register)

router.post('/register', (req, res) => {
    res.send('Hello logout!')
  })

module.exports = router