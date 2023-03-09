const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/farmers',Controller.showAllFarmers)
router.get('/farmers/:farmerId/goods',Controller.showFarmersGoods)


module.exports = router