'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Stories,{
        foreignKey: 'author_id'
      })
      Users.hasMany(models.Reviews,{
        foreignKey: 'reviewAuthor_id'
      })


    }
  }
  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    favorites: DataTypes.INTEGER,
    userType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};