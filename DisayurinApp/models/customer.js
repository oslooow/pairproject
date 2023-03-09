'use strict';
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
      Customer.belongsToMany(models.Product,{
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
      beforeCreate: (applicant, options) => {

        applicant.status = 'Pending'

        applicant.dateApplied = Sequelize.fn('NOW')

        let name = applicant.fullName.replace(/\s+/g, '_')
        let lastPhone = applicant.phone.slice(-4) 
        applicant.applicantCode = `${name}_${lastPhone}_${applicant.JobId}`
        return applicant
      }
    }
  });
  return Customer;
};