import authService from '../services/auth.service.js';

export class AuthController {
    async register(req, res, next) {
        try {
            const result = await authService.register(req.body);
            res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const result = await authService.login(req.body);
            res.json({
                status: 'success',
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({ message: 'Refresh token is required' });
            }
            res.json({ message: 'Token refreshed (placeholder)' });
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req, res, next) {
        try {
            res.json({
                status: 'success',
                data: {
                    user: req.user
                }
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            res.json({
                status: 'success',
                message: 'Logged out successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}
