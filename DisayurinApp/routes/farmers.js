const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/farmers',Controller.showAllFarmers)


module.exports = router