// backend/src/services/authService.js
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async register({ name, email, password, address }) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            const error = new Error('Email already exists');
            error.statusCode = 400;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, address });
        return { id: user.id };
    }

    async login({ email, password }) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1h' });
        return { token, user: { id: user.id, name: user.name, email: user.email } };
    }
}

module.exports = new AuthService();
