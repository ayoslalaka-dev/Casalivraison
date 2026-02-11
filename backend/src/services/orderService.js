// backend/src/services/orderService.js
const { Order, OrderItem, Menu } = require('../models');

class OrderService {
    async createOrder(userId, items) {
        let totalPrice = 0;
        const orderItemsData = [];

        // Calcul du prix total
        for (const item of items) {
            const menu = await Menu.findByPk(item.menuId);
            if (!menu) throw new Error(`Menu item ${item.menuId} not found`);

            const itemTotal = parseFloat(menu.price) * item.quantity;
            totalPrice += itemTotal;

            orderItemsData.push({
                menuId: item.menuId,
                quantity: item.quantity,
                price: menu.price
            });
        }

        const deliveryFee = 20.00;
        totalPrice += deliveryFee;

        const order = await Order.create({
            userId,
            totalPrice,
            deliveryFee,
            status: 'PENDING'
        });

        for (const itemData of orderItemsData) {
            await OrderItem.create({ ...itemData, orderId: order.id });
        }

        return order;
    }

    async getUserOrders(userId) {
        return await Order.findAll({
            where: { userId },
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{ model: Menu, as: 'menu' }]
            }],
            order: [['createdAt', 'DESC']]
        });
    }
}

module.exports = new OrderService();
