const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');

router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantMenu);
router.post('/', restaurantController.createRestaurant); // Admin
router.post('/:id/menus', restaurantController.addMenu); // Admin

module.exports = router;
