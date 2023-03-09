const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/home', Controller.home)

module.exports = router