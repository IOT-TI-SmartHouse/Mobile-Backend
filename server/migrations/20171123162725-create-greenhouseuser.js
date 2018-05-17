'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('GreenhouseUsers', {
            greenhouseId: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'RESTRICT',
                references: {
                    model: 'Greenhouses',
                    key: 'id',
                    as: 'greenhouseId',
                }
            },
            userId: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.INTEGER,
                onDelete: 'RESTRICT',
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId',
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
        return queryInterface.dropTable('GreenhouseUser');
    }
};