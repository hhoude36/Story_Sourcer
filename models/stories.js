'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Stories.belongsTo(models.Users,{
        foreignKey: 'author_id',
        onDelete: 'CASCADE'
      })
      Stories.hasMany(models.Reviews,{
        foreignKey: 'story_id',
        onDelete: 'CASCADE'
      })
    }
  }
  
  Stories.init({
    author_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    alt_title: DataTypes.STRING,
    age: DataTypes.STRING,
    mood: DataTypes.STRING,
    tags: DataTypes.STRING,
    length: DataTypes.STRING,
    level: DataTypes.STRING,
    source: DataTypes.STRING,
    country_of_origin: DataTypes.STRING,
    text: DataTypes.STRING,
    comments: DataTypes.STRING,
    imageType: DataTypes.STRING,
    imageName: DataTypes.STRING,
    imageData: DataTypes.BLOB('long') 
  }, {
    sequelize,
    modelName: 'Stories',
  });
  return Stories;
};

