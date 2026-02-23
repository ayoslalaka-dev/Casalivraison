/**
 * Order Status Constants
 * Defines all possible order statuses in the application
 */

const ORDER_STATUS = {
    PENDING: 'PENDING',           // En attente de validation
    VALIDATED: 'VALIDATED',       // Validée, en préparation
    IN_DELIVERY: 'IN_DELIVERY',   // En cours de livraison
    DELIVERED: 'DELIVERED',       // Livrée
    CANCELLED: 'CANCELLED'        // Annulée
};

// Array of all valid statuses for validation
const VALID_ORDER_STATUSES = Object.values(ORDER_STATUS);

module.exports = {
    ORDER_STATUS,
    VALID_ORDER_STATUSES
};
