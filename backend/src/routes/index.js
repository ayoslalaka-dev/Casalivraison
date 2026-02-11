// backend/src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const restaurantRoutes = require('./restaurants');
const orderRoutes = require('./orders');
const menuRoutes = require('./menus');

// Routes principales (sans préfixe ou avec, selon app.js)
// Dans app.js on a app.use('/api/v1', routes);
// Donc ici l'URL sera /api/v1/auth, /api/v1/restaurants, etc.

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);
router.use('/menus', menuRoutes);

module.exports = router;
