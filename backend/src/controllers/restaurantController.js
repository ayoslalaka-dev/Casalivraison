// backend/src/controllers/restaurantController.js
const restaurantService = require('../services/restaurantService');

exports.getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = await restaurantService.getAllRestaurants(req.query);
        res.json({ success: true, data: restaurants });
    } catch (error) {
        next(error);
    }
};

exports.getRestaurantMenu = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.getRestaurantDetails(req.params.id);
        res.json({ success: true, data: restaurant });
    } catch (error) {
        next(error);
    }
};

exports.getMenusByRestaurant = async (req, res, next) => {
    try {
        const { restaurantId } = req.params;
        const menus = await restaurantService.getMenusByRestaurantId(restaurantId);
        res.json({ success: true, data: menus });
    } catch (error) {
        next(error);
    }
};

exports.createRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.createRestaurant(req.body);
        res.status(201).json({ success: true, data: restaurant });
    } catch (error) {
        next(error);
    }
};

exports.addMenu = async (req, res, next) => {
    try {
        const menu = await restaurantService.addMenu(req.params.id, req.body);
        res.status(201).json({ success: true, data: menu });
    } catch (error) {
        next(error);
    }
};
