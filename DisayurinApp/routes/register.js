const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/register', Controller.register)

router.post('/register', Controller.saveRegister)

router.get('/register/admin', Controller.registerAdmin)

router.post('/register/admin', Controller.saveRegister)

module.exports = router
