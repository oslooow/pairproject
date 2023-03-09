const {Address , Customer , Farmer , Product , Transcation} = require("../models/index")
const { Op } = require("sequelize")
class Controller {
    static home (req,res) { // landing page home
        res.render("home")
    }

    static showAllFarmers (req,res) { // menampilkan semua farmers
        Farmer.findAll()
        .then(data =>{
            res.render("farmers",{data})
        })
        .catch(err => res.send(err))
    }

    static showAllProducts (req,res) { // menampilkan semua products
        const {  search  } = req.query
        const options = {
            where:{

            }
        }

        if(search){
            options.where.name = {
                [Op.iLike]: `%${search}%`
            }
        }
        console.log(search)

        Product.findAll(options)
        .then(data =>{
            // res.send(data)
            res.render("products",{data})
        })
        .catch(err => res.send(err))
    }

    static showProductsDetail (req,res) { // menampilkan detail products
        const productId = req.params.productId
        Product.findAll({where: {id:productId}})
        .then(data =>{
            res.render("productsDetail",{data})
        })
        .catch(err => res.send(err))
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
    static showAllCustomers (req,res) { // menampilkan semua customers
        Customer.findAll()
        .then(data =>{
            res.render("customers",{data})
        })
        .catch(err => res.send(err))
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