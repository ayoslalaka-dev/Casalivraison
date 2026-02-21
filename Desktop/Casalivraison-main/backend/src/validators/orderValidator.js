/**
 * Order Validators
 * Validates order-related requests
 */

const { VALID_ORDER_STATUSES } = require('../constants/orderStatus');

const validateCreateOrder = (req, res, next) => {
    const { userId, restaurantId, items, deliveryAddress, totalAmount } = req.body;
    const errors = [];

    // User ID validation
    if (!userId || isNaN(userId)) {
        errors.push('ID utilisateur invalide');
    }

    // Restaurant ID validation
    if (!restaurantId || isNaN(restaurantId)) {
        errors.push('ID restaurant invalide');
    }

    // Items validation
    if (!items || !Array.isArray(items) || items.length === 0) {
        errors.push('La commande doit contenir au moins un article');
    } else {
        items.forEach((item, index) => {
            if (!item.menuId || isNaN(item.menuId)) {
                errors.push(`Article ${index + 1}: ID menu invalide`);
            }
            if (!item.quantity || item.quantity < 1) {
                errors.push(`Article ${index + 1}: Quantité invalide`);
            }
            if (!item.price || item.price <= 0) {
                errors.push(`Article ${index + 1}: Prix invalide`);
            }
        });
    }

    // Delivery address validation
    if (!deliveryAddress || deliveryAddress.trim().length < 5) {
        errors.push('Adresse de livraison invalide');
    }

    // Total amount validation
    if (!totalAmount || totalAmount <= 0) {
        errors.push('Montant total invalide');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

const validateUpdateStatus = (req, res, next) => {
    const { status } = req.body;
    const errors = [];

    // Status validation
    if (!status || !VALID_ORDER_STATUSES.includes(status)) {
        errors.push(`Statut invalide. Valeurs acceptées: ${VALID_ORDER_STATUSES.join(', ')}`);
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};

module.exports = {
    validateCreateOrder,
    validateUpdateStatus
};
