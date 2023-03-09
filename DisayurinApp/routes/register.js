const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/register', Controller.register)

router.post('/register', Controller.saveRegister)

module.exports = router
