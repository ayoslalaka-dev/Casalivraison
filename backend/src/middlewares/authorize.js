/**
 * Authorization Middleware
 * Checks if user has required role(s) to access a route
 */

const { USER_ROLES } = require('../constants/userRoles');

/**
 * Middleware to check if user has one of the required roles
 * Must be used AFTER authenticate middleware
 * 
 * @param {...string} roles - Allowed roles (e.g., 'ADMIN', 'DRIVER')
 * @returns {Function} Express middleware
 * 
 * @example
 * router.get('/admin', authenticate, authorize('ADMIN'), adminController.dashboard);
 * router.get('/orders', authenticate, authorize('ADMIN', 'DRIVER'), orderController.list);
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentification requise.'
            });
        }

        // Check if user has required role
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `Accès refusé. Rôle requis: ${roles.join(' ou ')}`
            });
        }

        next();
    };
};

/**
 * Middleware to check if user is admin
 * Shorthand for authorize('ADMIN')
 */
const isAdmin = authorize(USER_ROLES.ADMIN);

/**
 * Middleware to check if user is driver
 * Shorthand for authorize('DRIVER')
 */
const isDriver = authorize(USER_ROLES.DRIVER);

/**
 * Middleware to check if user is client
 * Shorthand for authorize('CLIENT')
 */
const isClient = authorize(USER_ROLES.CLIENT);

/**
 * Middleware to check if user owns the resource
 * Compares req.user.id with req.params.userId or req.body.userId
 */
const isOwner = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Authentification requise.'
        });
    }

    const resourceUserId = req.params.userId || req.body.userId;

    if (!resourceUserId) {
        return res.status(400).json({
            success: false,
            error: 'ID utilisateur manquant.'
        });
    }

    // Allow if user is admin or owns the resource
    if (req.user.role === USER_ROLES.ADMIN || req.user.id === parseInt(resourceUserId)) {
        return next();
    }

    return res.status(403).json({
        success: false,
        error: 'Accès refusé. Vous ne pouvez accéder qu\'à vos propres ressources.'
    });
};

module.exports = {
    authorize,
    isAdmin,
    isDriver,
    isClient,
    isOwner
};
