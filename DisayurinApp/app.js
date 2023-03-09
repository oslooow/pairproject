const express = require('express')
const app = express()
const port = 3000
const customers = require("./routes/customers")
const user = require("./routes/user")
const farmers = require("./routes/farmers")
const products = require("./routes/products")
const home = require("./routes/home")

app.set("view engine" , "ejs")
app.use(express.urlencoded({extended:true}))
app.use(customers)
app.use(user)
app.use(farmers)
app.use(products)
app.use(home)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})