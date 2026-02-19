import { USER_ROLES } from '../constants/userRoles.js';

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                status: 'error',
                success: false,
                message: 'Authentication required'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'error',
                success: false,
                message: `Access denied. Required roles: ${roles.join(' or ')}`
            });
        }

        next();
    };
};

export const isAdmin = authorize(USER_ROLES.ADMIN);
export const isDriver = authorize(USER_ROLES.DRIVER);
export const isClient = authorize(USER_ROLES.CLIENT);

export const isOwner = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            status: 'error',
            success: false,
            message: 'Authentication required'
        });
    }

    const resourceUserId = req.params.userId || req.body.userId;

    if (!resourceUserId) {
        return res.status(400).json({
            status: 'error',
            success: false,
            message: 'User ID missing'
        });
    }

    if (req.user.role === USER_ROLES.ADMIN || req.user.id === parseInt(resourceUserId)) {
        return next();
    }

    return res.status(403).json({
        status: 'error',
        success: false,
        message: 'Access denied. You can only access your own resources.'
    });
};
