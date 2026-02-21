/**
 * Utility Functions: Validators
 * Provides validation utilities for the application
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { isValid: boolean, message: string }
 */
export const validatePassword = (password) => {
    if (!password || typeof password !== 'string') {
        return { isValid: false, message: 'Mot de passe requis' };
    }

    if (password.length < 6) {
        return { isValid: false, message: 'Le mot de passe doit contenir au moins 6 caractères' };
    }

    return { isValid: true, message: 'Mot de passe valide' };
};

/**
 * Validate phone number (Moroccan format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidPhone = (phone) => {
    if (!phone || typeof phone !== 'string') {
        return false;
    }

    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Moroccan phone numbers are typically 10 digits starting with 0
    return /^0[5-7]\d{8}$/.test(cleaned);
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateRequired = (value, fieldName = 'Ce champ') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return { isValid: false, message: `${fieldName} est requis` };
    }

    return { isValid: true, message: '' };
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Name of the field
 * @returns {object} { isValid: boolean, message: string }
 */
export const validateMinLength = (value, minLength, fieldName = 'Ce champ') => {
    if (!value || typeof value !== 'string') {
        return { isValid: false, message: `${fieldName} est requis` };
    }

    if (value.trim().length < minLength) {
        return {
            isValid: false,
            message: `${fieldName} doit contenir au moins ${minLength} caractères`
        };
    }

    return { isValid: true, message: '' };
};

export default {
    isValidEmail,
    validatePassword,
    isValidPhone,
    validateRequired,
    validateMinLength
};
