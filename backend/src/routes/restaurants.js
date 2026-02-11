// backend/src/routes/restaurants.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

// GET /restaurants
router.get('/', restaurantController.getAllRestaurants);

// GET /restaurants/:id
router.get('/:id', restaurantController.getRestaurantMenu);

// POST /restaurants (Admin)
router.post('/', restaurantController.createRestaurant);

// POST /restaurants/:id/menus (Admin)
router.post('/:id/menus', restaurantController.addMenu);

module.exports = router;
