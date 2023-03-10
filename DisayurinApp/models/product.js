'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
   
    get formatedPrice(){
      return this.price = "Rp." + this.price
    }

    static associate(models) {
      // define association here
      Product.belongsTo(models.Farmer);
      // Product.hasMany(models.Customer)
      // Product.hasMany(models.Transaction)
      Product.belongsToMany(models.Customer,{
        through: "Transactions",
        foreignKey: "ProductId"
      })
    }
    get formattedPrice(){
      return this.price = "Rp." + this.price
    }
  }
  Product.init({
    FarmerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING,
    img: DataTypes.STRING,
    description: DataTypes.TEXT,
    stock:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};