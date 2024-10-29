'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Direcciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING
      },
      Apellidos: {
        type: Sequelize.STRING
      },
      TelefonoCasa: {
        type: Sequelize.STRING
      },
      DireccionCasa: {
        type: Sequelize.TEXT
      },
      TelefonoTrabajo: {
        type: Sequelize.STRING
      },
      DireccionTrabajo: {
        type: Sequelize.TEXT
      },
      CorreoElectronico: {
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
    await queryInterface.dropTable('Direcciones');
  }
};