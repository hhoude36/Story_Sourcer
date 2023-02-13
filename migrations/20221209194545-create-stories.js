'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
            model: 'Users',
            key: 'id',
            as: 'author_id'
          }
      },
      title: {
        type: Sequelize.STRING
      },
      alt_title: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      mood: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      country_of_origin: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stories');
  }
};