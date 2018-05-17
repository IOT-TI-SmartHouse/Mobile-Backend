'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
            model: 'Users',
            key: 'id',
            as: 'userId',
        }
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
      typeId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
            model: 'Types',
            key: 'id',
            as: 'typeId',
        }
      },
      minimum: {
        type: Sequelize.FLOAT(8,2)
      },
      maximum: {
        type: Sequelize.FLOAT(8,2)
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
    return queryInterface.dropTable('Settings');
  }
};