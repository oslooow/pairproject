'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasOne(models.Address);  
        // Customer.hasMany(models.Product)
        Customer.belongsToMany(models.Product, {
          through: "Transactions",
          foreignKey: "CustomerId"
        })
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Customer',
    hooks: {
      beforeCreate: (customer) => {
        return bcrypt.genSalt(10)
          .then((salt) => {
            return bcrypt.hash(customer.password, salt)
              .then((hashedPassword) => {
                customer.password = hashedPassword;
              });
          });
      },
      beforeUpdate: (customer) => {
        if (customer.changed('password')) {
          return bcrypt.genSalt(10)
            .then((salt) => {
              return bcrypt.hash(customer.password, salt)
                .then((hashedPassword) => {
                  customer.password = hashedPassword;
                });
            }); 
        }
      }
    }
  });
  return Customer;
};