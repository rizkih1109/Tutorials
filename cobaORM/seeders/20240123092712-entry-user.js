'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Ninda Ayu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alya Nila',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Veronica',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alya',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Femi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Andini',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
