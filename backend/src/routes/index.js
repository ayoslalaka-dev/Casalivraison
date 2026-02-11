// backend/src/routes/index.js
const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const restaurantRoutes = require('./restaurants');
const orderRoutes = require('./orders');

router.use('/auth', authRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
