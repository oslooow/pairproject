const {Address , Customer , Farmer , Product , Transcation} = require("../models/index")

class Controller {
    static home (req,res) {
        res.render("home")
    }

    static showAllFarmers (req,res) {
        Farmer.findAll()
        .then(data =>{
            res.render("farmers",{data})
        })
        .catch(err => res.send(err))
    }
    static showAllProducts (req,res) {
        res.send("hi")
    }
    static showProductsDetail (req,res) {
        res.send("hi")
    }

    static addFarmer (req,res) {
        res.send("hi")
    }
    
    static saveAddFarmer (req,res) {
        res.send("hi")
    }


    static addProduct (req,res) {
        res.send("hi")
    }
    static saveAddProduct (req,res) {
        res.send("hi")
    }
    static showAllCustomers (req,res) {
        res.send("hi")
    }
    static showCustomersDetail (req,res) {
        res.send("hi")
    }
    static register (req,res) {
        res.send("hi")
    }
    static saveRegister (req,res) {
        res.send("hi")
    }
    static login (req,res) {
        res.send("hi")
    }
    static logout (req,res) {
        res.send("hi")
    }


}

module.exports = Controller