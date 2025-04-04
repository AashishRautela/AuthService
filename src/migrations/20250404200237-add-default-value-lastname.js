'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn('Users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: null
    });
  }
};
