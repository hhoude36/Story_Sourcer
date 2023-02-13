'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stories', [
      {
      author_id: 4,
      title: 'Little Red Riding Hood',
      alt_title: 'Little Red Cap',
      age: 'Middle School',
      mood: 'dark',
      tags: '',
      length: 'medium',
      level: 'medium',
      source: 'the Brothers Grimm',
      country_of_origin: 'Germany',
      text: 'Once upon a time...',
      comments: 'Great story',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Aschenputtel.jpg', 
      createdAt: new Date(),
      updatedAt: new Date()
      }, 

      {
        author_id: 5,
        title: 'Cinderella',
        alt_title: 'The Little Glass Slipper',
        age: 'Middle School',
        mood: 'dramatic',
        tags: '',
        length: 'long',
        level: 'difficult',
        source: 'the Brothers Grimm',
        country_of_origin: 'Germany',
        text: 'Once upon a time there was a girl...',
        comments: 'Love it',
        image: '', 
        createdAt: new Date(),
        updatedAt: new Date()
        }, 

        {
          author_id: 3,
          title: 'the Frog and the Rainbow',
          alt_title: null,
          age: '4th-5th',
          mood: 'twist ending',
          tags: '',
          length: 'short',
          level: 'easy',
          source: 'Original',
          country_of_origin: null,
          text: 'Once upon a time there was a frog...',
          comments: 'Terrible ending',
          image: '', 
          createdAt: new Date(),
          updatedAt: new Date()
          }, 
    ])
  }
  }
