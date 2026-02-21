// backend/tests/restaurants.test.js
const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('GET /api/v1/restaurants', () => {
    // Hooks de connexion/déconnexion DB si nécessaire, ou on utilise la base de test
    // Pour simplifier ici, on suppose que le serveur tourne ou que app.js gère la connexion

    it('should return all restaurants', async () => {
        const res = await request(app).get('/api/v1/restaurants');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });
});
