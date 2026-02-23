/**
 * Configuration Constants
 * Defines API and app configuration
 */

// API Configuration
export const API_CONFIG = {
    // Change based on your environment
    BASE_URL: 'http://localhost:3000/api/v1',

    // For Android Emulator, use: http://10.0.2.2:3000/api/v1
    // For iOS Simulator, use: http://localhost:3000/api/v1
    // For Physical Device, use: http://YOUR_IP:3000/api/v1

    TIMEOUT: 10000, // 10 seconds
};

// Order Status Constants
export const ORDER_STATUS = {
    PENDING: 'PENDING',
    VALIDATED: 'VALIDATED',
    IN_DELIVERY: 'IN_DELIVERY',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
};

// Order Status Labels (French)
export const ORDER_STATUS_LABELS = {
    PENDING: 'En attente',
    VALIDATED: 'Validée',
    IN_DELIVERY: 'En livraison',
    DELIVERED: 'Livrée',
    CANCELLED: 'Annulée'
};

// User Roles
export const USER_ROLES = {
    CLIENT: 'CLIENT',
    ADMIN: 'ADMIN',
    DRIVER: 'DRIVER'
};

// App Configuration
export const APP_CONFIG = {
    APP_NAME: 'CasaLivraison',
    CURRENCY: 'MAD',
    DELIVERY_FEE: 15, // MAD
};

export default {
    API_CONFIG,
    ORDER_STATUS,
    ORDER_STATUS_LABELS,
    USER_ROLES,
    APP_CONFIG
};
