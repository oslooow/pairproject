const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/', Controller.landing)


module.exports = router