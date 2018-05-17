'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Departments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      greenhouseId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
            model: 'Greenhouses',
            key: 'id',
            as: 'greenhouseId',
        }
      },
      sensorSpacingX: {
        type: Sequelize.FLOAT(6,2)
      },
      sensorSpacingY: {
        type: Sequelize.FLOAT(6,2)
      },
      sensorSpacingZ: {
        type: Sequelize.FLOAT(6,2)
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Departments');
  }
};