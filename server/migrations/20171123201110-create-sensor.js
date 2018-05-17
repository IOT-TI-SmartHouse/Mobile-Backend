'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sensors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      sensorNodeId: {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          references: {
              model: 'SensorNodes',
              key: 'id',
              as: 'sensorNodeId',
          }
      },
      typeId: {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          references: {
              model: 'Types',
              key: 'id',
              as: 'typeId',
          }
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
    return queryInterface.dropTable('Sensors');
  }
};