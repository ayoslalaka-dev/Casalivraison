import express from 'express';
const router = express.Router();

import restaurantRoutes from './restaurants.routes.js';
import orderRoutes from './orders.routes.js';
import menuRoutes from './menus.routes.js';

// Routes principales
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello from backend!', success: true });
});

router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);
router.use('/menus', menuRoutes);


export default router;
