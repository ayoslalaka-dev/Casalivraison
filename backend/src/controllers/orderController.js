const { Order, OrderItem, Menu } = require('../models');

exports.createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body; // items: [{ menuId, quantity }]

        // Calculate total
        let totalPrice = 0;
        const orderItemsData = [];

        for (const item of items) {
            const menu = await Menu.findByPk(item.menuId);
            if (!menu) continue;
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

        res.status(201).json({ message: 'Order created', orderId: order.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.query; // Or from token middleware
        const orders = await Order.findAll({
            where: { userId },
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{ model: Menu, as: 'menu' }]
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await Order.update({ status }, { where: { id } });
        res.json({ message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
