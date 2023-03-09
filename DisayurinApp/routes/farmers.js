const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/farmers',Controller.showAllFarmers)

// router.get('/farmers/addFarmer',Controller.addFarmer)

// router.post('/farmers/addFarmer',Controller.saveAddFarmer)



module.exports = router