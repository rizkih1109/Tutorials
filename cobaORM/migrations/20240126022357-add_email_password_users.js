'use strict';
const {sequelize} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const t = await sequelize.transaction();
    return Promise.all([
      queryInterface.addColumn('Users', 'email', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      }, { transaction: t }),
      queryInterface.addColumn('Users', 'password', {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      }, { transaction: t })
    ]);
  },

  async down (queryInterface, Sequelize) {
    const t = await sequelize.transaction();
    return Promise.all([
      queryInterface.removeColumn('Users', 'email', { transaction: t }),
      queryInterface.removeColumn('Users', 'password', { transaction: t })
    ]);
  }
};
