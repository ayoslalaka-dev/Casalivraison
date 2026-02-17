import models from '../models/index.js';
const { User } = models;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

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
        const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRES_IN || '1h' });
        return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    }
}

export default new AuthService();
