'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SensorNodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      departmentId: {
          type: Sequelize.INTEGER,
          onDelete: 'SET NULL',
          references: {
              model: 'Departments',
              key: 'id',
              as: 'departmentId',
          }
      },
      latitude: {
        type: Sequelize.DECIMAL(10,8)
      },
      longitude: {
        type: Sequelize.DECIMAL(11,8)
      },
      altitude: {
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
    return queryInterface.dropTable('SensorNodes');
  }
};