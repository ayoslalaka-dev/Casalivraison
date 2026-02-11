// backend/src/services/orderService.js
const { Order, OrderItem, Menu, DeliveryDriver, User, Restaurant } = require('../models');

class OrderService {
    async createOrder(userId, items) {
        let totalPrice = 0;
        const orderItemsData = [];

        // 1. Calcul du prix total et vérification des menus
        for (const item of items) {
            const menu = await Menu.findByPk(item.menuId);
            if (!menu) {
                const error = new Error(`Menu item ${item.menuId} not found`);
                error.statusCode = 404;
                throw error;
            }

            const itemTotal = parseFloat(menu.price) * item.quantity;
            totalPrice += itemTotal;

            orderItemsData.push({
                menuId: item.menuId,
                quantity: item.quantity,
                price: menu.price
            });
        }

        // Frais de livraison fixes
        const deliveryFee = 20.00;
        totalPrice += deliveryFee;

        // 2. Attribution aléatoire d'un livreur disponible
        const availableDrivers = await DeliveryDriver.findAll({
            where: { status: 'AVAILABLE' }
        });

        let assignedDriverId = null;
        if (availableDrivers.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableDrivers.length);
            assignedDriverId = availableDrivers[randomIndex].id;
        }

        // 3. Création de la commande
        const order = await Order.create({
            userId,
            totalPrice,
            deliveryFee,
            status: 'PENDING',
            deliveryDriverId: assignedDriverId
        });

        for (const itemData of orderItemsData) {
            await OrderItem.create({ ...itemData, orderId: order.id });
        }

        // Mise à jour du statut du livreur si assigné (optionnel mais logique)
        if (assignedDriverId) {
            await DeliveryDriver.update({ status: 'BUSY' }, { where: { id: assignedDriverId } });
        }

        return order;
    }

    async getOrderById(id) {
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{ model: Menu, as: 'menu' }]
                },
                { model: DeliveryDriver, as: 'driver' },
                { model: User, as: 'user', attributes: ['name', 'email', 'address'] }
            ]
        });

        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }
        return order;
    }

    async getUserOrders(userId) {
        return await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    as: 'items',
                    include: [{ model: Menu, as: 'menu' }]
                },
                { model: DeliveryDriver, as: 'driver' }
            ],
            order: [['createdAt', 'DESC']]
        });
    }

    async updateOrderStatus(orderId, status, driverId = null) {
        const order = await Order.findByPk(orderId);
        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }

        const updateData = { status };
        if (driverId) {
            updateData.deliveryDriverId = driverId;
        }

        await order.update(updateData);

        // Si la commande est livrée ou annulée, libérer le livreur
        if ((status === 'DELIVERED' || status === 'CANCELLED') && order.deliveryDriverId) {
            await DeliveryDriver.update({ status: 'AVAILABLE' }, { where: { id: order.deliveryDriverId } });
        }

        return order;
    }
}

module.exports = new OrderService();
