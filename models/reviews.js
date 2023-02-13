'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Reviews.belongsTo(models.Users,{
        foreignKey: 'reviewAuthor_id',
        onDelete: 'CASCADE'
      })
      Reviews.belongsTo(models.Stories,{
        foreignKey: 'story_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Reviews.init({
    reviewAuthor_id: DataTypes.INTEGER,
    story_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};