// 20240101000004-create-orders.js
'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'VALIDATED', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED'),
                defaultValue: 'PENDING'
            },
            totalPrice: {
                type: Sequelize.DECIMAL(10, 2)
            },
            deliveryFee: {
                type: Sequelize.DECIMAL(10, 2)
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            deliveryDriverId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'DeliveryDrivers',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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

        await queryInterface.createTable('OrderItems', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            price: {
                type: Sequelize.DECIMAL(10, 2)
            },
            orderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Orders',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            menuId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Menus',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('OrderItems');
        await queryInterface.dropTable('Orders');
    }
};
