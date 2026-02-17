/**
 * Authentication Validators
 * Validates authentication-related requests
 */

const validateRegister = (req, res, next) => {
    const { name, email, password, address } = req.body;
    const errors = [];

    // Validation du nom
    if (!name || name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Email invalide');
    }

    // Validation du mot de passe
    if (!password || password.length < 6) {
        errors.push('Le mot de passe doit contenir au moins 6 caractères');
    }

    // Validation de l'adresse (optionnelle mais min 3 caractères si fournie)
    if (address && address.trim().length < 3) {
        errors.push('Adresse trop courte (min 3 caractères)');
    }

    if (errors.length > 0) {
        return res.status(400).json({ status: 'error', errors });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email || !email.trim()) {
        errors.push('Email requis');
    }

    if (!password || !password.trim()) {
        errors.push('Mot de passe requis');
    }

    if (errors.length > 0) {
        return res.status(400).json({ status: 'error', errors });
    }

    next();
};

export {
    validateRegister,
    validateLogin
};
