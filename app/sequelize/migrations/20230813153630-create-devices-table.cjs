'use strict';

/** @type {import('sequelize-cli').Migration} */
const { DEVICE_TABLE, DeviceModel } = require('../models/deviceModel')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(DEVICE_TABLE, DeviceModel)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    
    await queryInterface.dropTable(DEVICE_TABLE)
  }
};

