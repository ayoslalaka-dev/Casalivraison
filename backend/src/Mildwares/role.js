/**
 * Middleware pour vérifier les rôles des utilisateurs.
 * @param {...string} allowedRoles - Liste des rôles autorisés.
 */
export const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};
