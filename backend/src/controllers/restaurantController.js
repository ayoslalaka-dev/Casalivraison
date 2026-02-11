const { Restaurant, Menu } = require('../models');

exports.getAllRestaurants = async (req, res) => {
    try {
        const { zone } = req.query;
        const whereClause = zone ? { address: zone } : {};
        const restaurants = await Restaurant.findAll({ where: whereClause });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRestaurantMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id, {
            include: [{ model: Menu, as: 'menus' }]
        });
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.create({ ...req.body, restaurantId: id });
        res.status(201).json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
