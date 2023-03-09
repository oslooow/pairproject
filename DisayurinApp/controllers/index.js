const { Address, Customer, Farmer, Product, Transcation } = require("../models/index")
const { Op } = require("sequelize")
class Controller {

    static landing(req, res) {
        res.render('landing')
    }

    static home(req, res) { // landing page home
        // console.log(req.session.user);
        let {name, role} = req.session.user
        let toSend = {name, role}
        res.render("home",{toSend})
    }

    static showAllFarmers(req, res) { // menampilkan semua farmers
        let {name, role} = req.session.user
        let toSend = {name, role}
        Farmer.findAll()
            .then(data => {
                res.render("farmers", { data,toSend })
            })
            .catch(err => res.send(err))
    }

    static showAllProducts(req, res) { // menampilkan semua products
        let {name, role} = req.session.user
        let toSend = {name, role}
        const { search } = req.query
        const options = {
            where: {

            }
        }

        if (search) {
            options.where.name = {
                [Op.iLike]: `%${search}%`
            }
        }
        console.log(search)

        Product.findAll(options)
            .then(data => {
                // res.send(data)
                res.render("products", { data,toSend })
            })
            .catch(err => res.send(err))
    }

    static showProductsDetail(req, res) { // menampilkan detail products
        let {name, role} = req.session.user
        let toSend = {name, role}
        const productId = req.params.productId
        Product.findAll({ where: { id: productId } })
            .then(data => {
                res.render("productsDetail", { data,toSend })
            })
            .catch(err => res.send(err))
    }

    static addProduct (req,res) { // show add form
        let {name, role} = req.session.user
        let toSend = {name, role}
        // console.log(req.body);
        Farmer.findAll()
        .then(data =>{
            res.render("addProducts",{data,toSend})
        })
        .catch(err => res.send(err))
    }
    static saveAddProduct (req,res) {
        let { name , category, FarmerId } = req.body
        Product.create({ name , category, FarmerId })
        .then(data =>{
            // res.send(data)
            res.redirect("/products")
        })
        .catch(err => res.send(err))
    }
    
    static showAllCustomers(req, res) { // menampilkan semua customers
        let {name, role} = req.session.user
        let toSend = {name, role}
        Customer.findAll()
            .then(data => {
                res.render("customers", { data,toSend })
            })
            .catch(err => res.send(err))
    }
    static showCustomersDetail(req, res) {
        res.send("hi")
    }
    static register(req, res) {
        res.render('register')
    }
    static saveRegister(req, res) {
        console.log(req.body);
        let { name, username, password, email } = req.body
        Customer.create({ name, username, password, email })
            .then(data => res.redirect('/login'))
            .catch(err => res.send(err))
    }
}

module.exports = Controller