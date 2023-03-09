const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/farmers',Controller.showAllFarmers)

router.get('/farmers/addFarmer',Controller.addFarmer)

router.post('/farmers/addFarmer',Controller.saveAddFarmer)

router.get('/farmers/:farmId/addProduct', (req, res) => {
    res.send('Hello add farm products!')
  })
router.post('/farmers/:farmId/addProduct', (req, res) => {
    res.send('Hello farmers!')
  })

module.exports = router