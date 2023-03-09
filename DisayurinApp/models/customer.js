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
      Customer.hasOne(models.Address),
        // Customer.hasMany(models.Product)
        Customer.belongsToMany(models.Product, {
          through: "Transactions",
          foreignKey: "CustomerId"
        })
    }
  }
  Customer.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : "Name must be filled"
        },
        notEmpty:{
          msg : "Name must be filled"
        },
        isAlpha: {
          isAlpha:true,
          msg:"Name can only use alphabet"
        },        
      }
    },
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : "Username must be filled"
        },
        notEmpty:{
          msg : "Username must be filled"
        },
        isAlpha: {
          isAlpha:true,
          msg:"Username can only use alphabet"
        },    
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : "Password must be filled"
        },
        notEmpty:{
          msg : "Password must be filled"
        },
        isAlphanumeric:{
          isAlphanumeric:true,
          msg:"Password can only contain Alphanumeric"
        },    
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg : "Email must be filled"
        },
        notEmpty:{
          msg : "Email must be filled"
        },    
      }
    },
    role:{
      type:DataTypes.STRING,
      defaultValue: "Customer"
    },
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