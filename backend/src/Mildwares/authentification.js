import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';

/**
 * Middleware d'authentification pour vérifier le token JWT
 * et attacher l'utilisateur à la requête.
 */
export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, env.JWT_SECRET);

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
