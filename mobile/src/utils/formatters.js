/**
 * Utility Functions: Formatters
 * Provides formatting utilities for the application
 */

import { APP_CONFIG } from '../constants/config';

/**
 * Format price with currency
 * @param {number} price - Price to format
 * @returns {string} Formatted price (e.g., "150 MAD")
 */
export const formatPrice = (price) => {
    if (typeof price !== 'number') {
        return '0 MAD';
    }
    return `${price.toFixed(2)} ${APP_CONFIG.CURRENCY}`;
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date (e.g., "17 févr. 2026")
 */
export const formatDate = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
        return 'Date invalide';
    }

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return dateObj.toLocaleDateString('fr-FR', options);
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date with time (e.g., "17 févr. 2026 à 14:30")
 */
export const formatDateTime = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
        return 'Date invalide';
    }

    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    const formattedDate = dateObj.toLocaleDateString('fr-FR', dateOptions);
    const formattedTime = dateObj.toLocaleTimeString('fr-FR', timeOptions);

    return `${formattedDate} à ${formattedTime}`;
};

/**
 * Format phone number
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number (e.g., "06 12 34 56 78")
 */
export const formatPhone = (phone) => {
    if (!phone || typeof phone !== 'string') {
        return '';
    }

    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Format as XX XX XX XX XX
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);

    if (match) {
        return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }

    return phone;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text || typeof text !== 'string') {
        return '';
    }

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.substring(0, maxLength)}...`;
};

export default {
    formatPrice,
    formatDate,
    formatDateTime,
    formatPhone,
    truncateText
};
