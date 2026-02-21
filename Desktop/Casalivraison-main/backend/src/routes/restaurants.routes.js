import { Router } from 'express';
const router = Router();
import restaurantController from '../controllers/restaurant.controller.js';

router.get('/', restaurantController.getAll);
router.get('/:id', restaurantController.getOne);

export default router;
