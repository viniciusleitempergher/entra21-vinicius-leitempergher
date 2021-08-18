'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios_projetos', {
      id_cliente: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: "usuarios",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      id_projeto: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: "projetos",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios_projetos');
  }
};