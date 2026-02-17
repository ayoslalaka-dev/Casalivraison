import { Router } from 'express';
const router = Router();
import orderController from '../controllers/order.controller.js';
import { authMiddleware } from '../Mildwares/authentification.js';

// Protéger toutes les routes de commandes
router.use(authMiddleware);

router.post('/', orderController.create);
router.get('/user/:userId', orderController.getAll);
router.get('/:id', orderController.getOne);
router.put('/:id/status', orderController.updateStatus);

export default router;
