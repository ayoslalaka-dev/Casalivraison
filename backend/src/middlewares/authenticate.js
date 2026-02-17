/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */

const jwt = require('jsonwebtoken');
const { User } = require('../models');

/**
 * Middleware to verify JWT token
 * Adds user object to req.user if token is valid
 */
const authenticate = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Accès non autorisé. Token manquant.'
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await User.findByPk(decoded.userId, {
            attributes: { exclude: ['password'] } // Don't include password
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Utilisateur non trouvé.'
            });
        }

        // Attach user to request
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Token invalide.'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expiré.'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Erreur lors de la vérification du token.'
        });
    }
};

/**
 * Optional authentication middleware
 * Attaches user if token is present, but doesn't fail if missing
 */
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return next(); // Continue without user
        }

        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.userId, {
            attributes: { exclude: ['password'] }
        });

        if (user) {
            req.user = user;
        }

        next();
    } catch (error) {
        // Ignore errors and continue without user
        next();
    }
};

module.exports = {
    authenticate,
    optionalAuth
};
