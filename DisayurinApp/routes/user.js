const router = require("express").Router()
const Controller = require("../controllers/index")

router.get('/register', (req, res) => {
    res.send('Hello form regist!')
  })

router.post('/register', (req, res) => {
    res.send('Hello logout!')
  })

router.get('/login', (req, res) => {
    res.send('Hello login!')
  })
  

router.get('/logout', (req, res) => {
    res.send('Hello logout!')
  })



module.exports = router