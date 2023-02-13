'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
      {
      username: 'hhoude',
      password: 'ILoveCheese123',
      first_name: 'Heather',
      last_name: 'Houde',
      favorites: '',
      createdAt: new Date(),
      updatedAt: new Date()
      }, 
      {
        username: 'dhiller',
        password: 'ILoveGizmo123',
        first_name: 'David',
        last_name: 'Hiller',
        favorites: '',
        createdAt: new Date(),
        updatedAt: new Date()
        }, 
        {
          username: 'apeterson',
          password: 'ILoveFitness123',
          first_name: 'Aleisha',
          last_name: 'Peterson',
          favorites: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ])
  }
    }

    