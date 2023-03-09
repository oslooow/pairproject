const router = require("express").Router()
const Controller = require("../controllers/index")

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect('/login');
    } 
  });
})

module.exports = router