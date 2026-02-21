import models from '../models/index.js';
const { Restaurant, Menu, Category } = models;

class RestaurantService {
    async getAllRestaurants({ zone }) {
        const whereClause = zone ? { address: zone } : {};
        return await Restaurant.findAll({
            where: whereClause,
            include: [
                { model: Category, as: 'category', attributes: ['name', 'imageUrl'] }
            ]
        });
    }

    async getRestaurantDetails(id) {
        const restaurant = await Restaurant.findByPk(id, {
            include: [
                { model: Category, as: 'category' },
                { model: Menu, as: 'menus' }
            ]
        });

        if (!restaurant) {
            const error = new Error('Restaurant not found');
            error.statusCode = 404;
            throw error;
        }

        return restaurant;
    }

    async getMenusByRestaurantId(restaurantId) {
        const menus = await Menu.findAll({
            where: { restaurantId },
            include: [{ model: Restaurant, as: 'restaurant', attributes: ['name'] }]
        });
        return menus;
    }

    async createRestaurant(data) {
        return await Restaurant.create(data);
    }

    async addMenu(restaurantId, menuData) {
        const restaurant = await Restaurant.findByPk(restaurantId);
        if (!restaurant) {
            const error = new Error('Restaurant not found');
            error.statusCode = 404;
            throw error;
        }
        return await Menu.create({ ...menuData, restaurantId });
    }
}

export default new RestaurantService();
