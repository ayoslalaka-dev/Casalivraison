// backend/src/routes/menus.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// GET /menus/restaurant/:restaurantId
router.get('/restaurant/:restaurantId', restaurantController.getMenusByRestaurant);

module.exports = router;
