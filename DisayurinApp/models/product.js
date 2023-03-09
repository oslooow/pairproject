'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Farmer)
      // Product.hasMany(models.Customer)
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
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};