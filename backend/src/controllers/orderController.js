// backend/src/controllers/orderController.js
const orderService = require('../services/orderService');

exports.createOrder = async (req, res, next) => {
    try {
        const { userId, items } = req.body;
        const order = await orderService.createOrder(userId, items);
        res.status(201).json({ success: true, message: 'Order created', data: order });
    } catch (error) {
        next(error);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        res.json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};

exports.getUserOrders = async (req, res, next) => {
    try {
        // Support both query and params for userId as per request requirements
        const userId = req.params.userId || req.query.userId;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'UserId is required' });
        }
        const orders = await orderService.getUserOrders(userId);
        res.json({ success: true, data: orders });
    } catch (error) {
        next(error);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, driverId } = req.body;
        const updatedOrder = await orderService.updateOrderStatus(id, status, driverId);
        res.json({ success: true, message: 'Order status updated', data: updatedOrder });
    } catch (error) {
        next(error);
    }
};
