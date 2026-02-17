import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../Mildwares/authentification.js';
import { validateRegister } from '../validators/authValidator.js';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validateRegister, authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/refresh', authController.refreshToken.bind(authController));

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile.bind(authController));
router.post('/logout', authMiddleware, authController.logout.bind(authController));

export default router;
