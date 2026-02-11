// backend/src/routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /orders
router.post('/', orderController.createOrder); // Auth middleware required usually

// GET /orders/:id
router.get('/:id', orderController.getOrderById);

// GET /orders/user/:userId
router.get('/user/:userId', orderController.getUserOrders);

// PUT /orders/:id/status (User requested PUT, we accept PUT or PATCH)
router.put('/:id/status', orderController.updateOrderStatus);
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;
