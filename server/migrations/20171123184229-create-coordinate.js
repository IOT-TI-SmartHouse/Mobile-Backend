'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Coordinates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      latitude: {
          type: Sequelize.DECIMAL(10,8)
      },
      longitude: {
          type: Sequelize.DECIMAL(11,8)
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
        sort: {
            type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Coordinates');
  }
};