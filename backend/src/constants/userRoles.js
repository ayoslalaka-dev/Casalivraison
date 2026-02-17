/**
 * User Role Constants
 * Defines all possible user roles in the application
 */

const USER_ROLES = {
    CLIENT: 'CLIENT',     // Client standard
    ADMIN: 'ADMIN',       // Administrateur
    DRIVER: 'DRIVER'      // Livreur
};

// Array of all valid roles for validation
const VALID_USER_ROLES = Object.values(USER_ROLES);

module.exports = {
    USER_ROLES,
    VALID_USER_ROLES
};
