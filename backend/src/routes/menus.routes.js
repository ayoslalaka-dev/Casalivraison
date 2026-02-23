import { Router } from 'express';
const router = Router();
import restaurantController from '../controllers/restaurant.controller.js';

router.get('/restaurant/:id', restaurantController.getMenus);

export default router;
