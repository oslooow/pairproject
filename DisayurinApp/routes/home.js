const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/', Controller.home)

module.exports = router