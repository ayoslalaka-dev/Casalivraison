// 20240101000001-demo-data.js
'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const now = new Date();
        const hashedPassword = await bcrypt.hash('123456', 10);

        // 1. Users
        const existingUsers = await queryInterface.sequelize.query(
            `SELECT id from "Users" WHERE email IN ('admin@casa.ma', 'client@casa.ma');`
        );
        if (existingUsers[0].length === 0) {
            await queryInterface.bulkInsert('Users', [
                { name: 'Yassine Admin', email: 'admin@casa.ma', password: hashedPassword, role: 'ADMIN', address: 'Maârif', createdAt: now, updatedAt: now },
                { name: 'User Test', email: 'client@casa.ma', password: hashedPassword, role: 'CLIENT', address: 'Gauthier', createdAt: now, updatedAt: now },
            ], {});
        }

        // 2. Categories
        const existingCategories = await queryInterface.sequelize.query(`SELECT id from "Categories" LIMIT 1;`);
        if (existingCategories[0].length === 0) {
            await queryInterface.bulkInsert('Categories', [
                { id: 1, name: 'Pizza', imageUrl: 'pizza.jpg', createdAt: now, updatedAt: now },
                { id: 2, name: 'Sushi', imageUrl: 'sushi.jpg', createdAt: now, updatedAt: now },
                { id: 3, name: 'Marocain', imageUrl: 'tajine.jpg', createdAt: now, updatedAt: now },
            ], {});
        }

        // 3. DeliveryDrivers
        const existingDrivers = await queryInterface.sequelize.query(`SELECT id from "DeliveryDrivers" LIMIT 1;`);
        if (existingDrivers[0].length === 0) {
            await queryInterface.bulkInsert('DeliveryDrivers', [
                { name: 'Ahmed Livreur', phone: '0661111111', status: 'AVAILABLE', createdAt: now, updatedAt: now },
                { name: 'Karim Livreur', phone: '0662222222', status: 'BUSY', createdAt: now, updatedAt: now },
            ], {});
        }

        // 4. Restaurants
        const existingRestaurants = await queryInterface.sequelize.query(`SELECT id from "Restaurants" LIMIT 1;`);
        if (existingRestaurants[0].length === 0) {
            await queryInterface.bulkInsert('Restaurants', [
                { id: 1, name: 'Pizza Hut', categoryId: 1, address: 'Maârif', imageUrl: 'pizzahut.jpg', createdAt: now, updatedAt: now },
                { id: 2, name: 'Sushi House', categoryId: 2, address: 'Gauthier', imageUrl: 'sushihouse.jpg', createdAt: now, updatedAt: now },
                { id: 3, name: 'Tajine World', categoryId: 3, address: 'Anfa', imageUrl: 'tajine.jpg', createdAt: now, updatedAt: now },
            ], {});
        }

        // 5. Menus
        const existingMenus = await queryInterface.sequelize.query(`SELECT id from "Menus" LIMIT 1;`);
        if (existingMenus[0].length === 0) {
            await queryInterface.bulkInsert('Menus', [
                { restaurantId: 1, name: 'Margherita', description: 'Cheese & Tomato', price: 50.00, imageUrl: 'margherita.jpg', createdAt: now, updatedAt: now },
                { restaurantId: 1, name: 'Pepperoni', description: 'Cheese, Tomato & Pepperoni', price: 65.00, imageUrl: 'pepperoni.jpg', createdAt: now, updatedAt: now },
                { restaurantId: 2, name: 'California Roll', description: 'Avocado, Crab, Cucumber', price: 45.00, imageUrl: 'california.jpg', createdAt: now, updatedAt: now },
                { restaurantId: 3, name: 'Tajine Poulet', description: 'Poulet, Citron confit, Olives', price: 70.00, imageUrl: 'poulet.jpg', createdAt: now, updatedAt: now },
            ], {});
        }

        console.log('Seeders checked and executed if necessary');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('OrderItems', null, {});
        await queryInterface.bulkDelete('Menus', null, {});
        await queryInterface.bulkDelete('Restaurants', null, {});
        await queryInterface.bulkDelete('DeliveryDrivers', null, {});
        await queryInterface.bulkDelete('Categories', null, {});
        await queryInterface.bulkDelete('Users', null, {});
    }
};
