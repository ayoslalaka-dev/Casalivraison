// backend/tests/orders.test.js
const request = require('supertest');
const app = require('../src/app');
const { User, Menu, Restaurant, Category, DeliveryDriver } = require('../src/models');

describe('Orders API', () => {
    let userId;
    let menuId;
    let orderId;

    beforeAll(async () => {
        // Setup data for tests
        // Note: Idéalement utiliser une DB de test propre et des factories
        // Ici on crée des données minimales
        // On suppose que les tables existent (sync ou migrate fait)

        // Ensure category exists
        const category = await Category.create({ name: 'TestCat-' + Date.now() });
        // Ensure restaurant exists
        const restaurant = await Restaurant.create({
            name: 'Test Resto',
            address: 'Test Addr',
            categoryId: category.id
        });
        // Ensure menu exists
        const menu = await Menu.create({
            name: 'Test Menu',
            price: 50,
            restaurantId: restaurant.id
        });
        menuId = menu.id;

        // Ensure user exists
        let user = await User.findOne({ where: { email: 'test@test.com' } });
        if (!user) {
            user = await User.create({
                name: 'Test User',
                email: 'test@test.com',
                password: 'pass'
            });
        }
        userId = user.id;

        // Ensure driver
        await DeliveryDriver.create({
            name: 'Driver Test',
            phone: '0000',
            status: 'AVAILABLE'
        });
    });

    it('should create a new order', async () => {
        const res = await request(app)
            .post('/api/v1/orders')
            .send({
                userId: userId,
                items: [{ menuId: menuId, quantity: 2 }]
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data.totalPrice).toBeGreaterThan(0); // 50*2 + 20 = 120
        orderId = res.body.data.id;
    });

    it('should update order status', async () => {
        const res = await request(app)
            .put(`/api/v1/orders/${orderId}/status`)
            .send({
                status: 'DELIVERED'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.status).toEqual('DELIVERED');
    });

    it('should return 404 for non-existent order', async () => {
        const res = await request(app)
            .put('/api/v1/orders/999999/status')
            .send({ status: 'DELIVERED' });

        expect(res.statusCode).toEqual(404);
    });
});
