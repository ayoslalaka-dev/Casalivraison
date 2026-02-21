import { Router } from 'express';
const router = Router();
import orderController from '../controllers/order.controller.js';
// Routes de commandes (Ouvertes aux invités)


router.post('/', orderController.create);
router.get('/user/:userId', orderController.getAll);
router.get('/:id', orderController.getOne);
router.put('/:id/status', orderController.updateStatus);

export default router;
