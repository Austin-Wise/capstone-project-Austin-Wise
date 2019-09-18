'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Journals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      ticker: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('Long', 'Short')
      },
      buyDate: {
        type: Sequelize.DATE
      },
      sellDate: {
        type: Sequelize.DATE
      },
      qtyBuy: {
        type: Sequelize.INTEGER
      },
      sellDate: {
        type: Sequelize.INTEGER
      },
      qtyBuy: {
        type: Sequelize.INTEGER
      },
      qtySold: {
        type: Sequelize.INTEGER
      },
      buyPrice: {
        type: Sequelize.INTEGER
      },
      sellPrice: {
        type: Sequelize.INTEGER
      },
      fees: {
        type: Sequelize.INTEGER
      },
      comment: {
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
  down: queryInterface => {
    return queryInterface.dropTable('Journals');
  }
};
