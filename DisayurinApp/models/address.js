'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    
    static associate(models) {
      // define association here
      Address.belongsTo(models.Customer)
    }
  }
  Address.init({
    CustomerId: DataTypes.INTEGER,
    streetName: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};