const { Address, Customer, Farmer, Product, Transaction } = require("../models/index")
const { Op } = require("sequelize")
const { privateDecrypt } = require("crypto")
const total = require('../helper/total');
class Controller {

    static landing(req, res) { // landing page
        res.render('landing')
    }

    static home(req, res) { // landing page home
        // console.log(req.session.user);
        let {id, name, role } = req.session.user
        let toSend = {id, name, role }
        res.render("home", { toSend })
    }

    static showAllFarmers(req, res) { // menampilkan semua farmers
        let { name, role } = req.session.user
        let toSend = { name, role }
        Farmer.findAll()
            .then(data => {
                res.render("farmers", { data, toSend })
            })
            .catch(err => res.send(err))
    }

    static showAllProducts(req, res) { // menampilkan semua products
        let { id, name, role } = req.session.user
        let toSend = { id, name, role }
        const { search } = req.query
        const options = {
            include: Customer,
            order: [["createdAt", "ASC"]],
            where: {

            }
        }

        if (search) {
            options.where.name = {
                [Op.iLike]: `%${search}%`
            }
        }


        Product.findAll(options)
            .then(data => {
                // res.send(data)
                res.render("products", { data, toSend })
            })
            .catch(err => res.send(err))
    }

    static showProductsDetail(req, res) { // menampilkan detail products
        let { name, role } = req.session.user
        let toSend = { name, role }
        const productId = req.params.productId
        Product.findAll({ where: { id: productId } })
            .then(data => {
                res.render("productsDetail", { data, toSend })
            })
            .catch(err => res.send(err))
    }

    static addProduct(req, res) { // show add form
        let { name, role } = req.session.user
        let toSend = { name, role }
        // console.log(req.body);
        Farmer.findAll()
            .then(data => {
                res.render("addProducts", { data, toSend })
            })
            .catch(err => res.send(err))
    }
    static saveAddProduct(req, res) {
        const { name, category, FarmerId } = req.body
        Product.create({ name, category, FarmerId })
            .then(data => {
                // res.send(data)
                res.redirect("/products")
            })
            .catch(err => res.send(err))
    }

    static showAllCustomers(req, res) { // menampilkan semua customers
        let { name, role } = req.session.user
        let toSend = { name, role }
        Customer.findAll()
            .then(data => {
                res.render("customers", { data, toSend })
            })
            .catch(err => res.send(err))
    }

    static deleteProductsById(req, res) { // delete by id
        const productId = req.params.productId
        Product.destroy({ where: { id: productId } })
            .then(data => {
                res.redirect("/products")
            })
            .catch(err => res.send(err))
    }

    static showUpdateForm(req, res) { // menampulkan update form
        let { id, name, role } = req.session.user
        let toSend = { id, name, role }
        const productId = req.params.productId
        Product.findByPk(productId)
            .then(data => {
                // res.send(data)
                res.render("updateForm", { data ,toSend})
            })
            .catch(err => res.send(err))

    }

    static saveUpdate(req, res) { // save update
        const { name, category } = req.body
        const productId = req.params.productId
        Product.update({ name, category }, {
            where: { id: productId }
        })
            .then(() => {
                res.redirect("/products")
            })
            .catch(err => res.send(err))
    }

    static showFarmersGoods(req, res) {
        let { name, role } = req.session.user
        let toSend = { name, role }
        const farmerId = req.params.farmerId
        Farmer.findAll({
            include: Product,
            where: { id: { [Op.eq]: farmerId }}
        })
            .then(data => {
                // res.send(data)
                res.render("listFarmersGoods", { data,toSend })
            })
            .catch(err => res.send(err))
    }

    static register(req, res) { // show form regis
        const errors = req.query.errors

        res.render('register', { errors })
    }

    static registerAdmin(req, res) { // show form regis
        const errors = req.query.errors

        res.render('registerAdmin', { errors })
    }

    static saveRegister(req, res) { //save register

        let { name, username, password, email, role} = req.body
        Customer.create({ name, username, password, email ,role})
            .then(data => res.redirect('/login'))
            .catch(err => {
                // res.send(err)
                if (err.name === "SequelizeValidationError") {
                    const errors = err.errors.map(e => e.message)

                    res.redirect(`/register?errors=${errors}`)
                } else res.send(err)
            })
    }
    static buy(req, res) {
        const { ProductId, CustomerId, quantity } = req.body;
        let transaction;

        Transaction.findOne({ where: { ProductId, CustomerId } })
            .then((result) => {
                if (result) {
                    transaction = result;
                    transaction.quantity += quantity;
                    return Product.findByPk(ProductId);
                } else {
                    transaction = Transaction.build({
                        ProductId,
                        CustomerId,
                        quantity,
                    });
                    return Product.findByPk(ProductId);
                }
            })
            .then((product) => {
                if (product.stock < quantity) {
                    throw new Error("Insufficient stock!");
                } else {
                    product.stock -= quantity;
                    return product.save();
                }
            })
            .then(() => {
                return transaction.save();
            })
            .then(() => {
                return Transaction.findOne({
                    where: { id: transaction.id },
                    include: [
                        { model: Product, attributes: ["name", "price", "stock"] },
                        { model: Customer, attributes: ["name", "email"] },
                    ],
                });
            })  
            .then((result) => {
                // totalPrice = result.Product.price * result.quantity;
                res.redirect('/products');
            })
            .catch((error) => {
                res.send(error);
            });
    }

    static cart(req, res) {
        let {id, name, role } = req.session.user
        let toSend = { name, role }
        Transaction.findAll({
          where: { CustomerId: id },
          include: [{ model: Product }],
        })
          .then((transactions) => {
            // res.send(transactions)   
            res.render('cart', { transactions,toSend });
          })
          .catch((error) => {
            console.log(error);
            res.send(err)
          });
      }
      
}

module.exports = Controller