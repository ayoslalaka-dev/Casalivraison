/**
 * Rate Limiting Middleware
 * Prevents abuse by limiting the number of requests from a single IP
 */

/**
 * Simple in-memory rate limiter
 * For production, consider using Redis-based rate limiting
 */
class RateLimiter {
    constructor() {
        this.requests = new Map();
    }

    /**
     * Create rate limiting middleware
     * 
     * @param {Object} options - Rate limiting options
     * @param {number} options.windowMs - Time window in milliseconds
     * @param {number} options.max - Maximum number of requests per window
     * @param {string} options.message - Error message when limit exceeded
     * @returns {Function} Express middleware
     */
    createLimiter({ windowMs = 15 * 60 * 1000, max = 100, message = 'Trop de requêtes, veuillez réessayer plus tard.' } = {}) {
        return (req, res, next) => {
            const ip = req.ip || req.connection.remoteAddress;
            const now = Date.now();

            // Get or create request history for this IP
            if (!this.requests.has(ip)) {
                this.requests.set(ip, []);
            }

            const requestHistory = this.requests.get(ip);

            // Remove old requests outside the time window
            const validRequests = requestHistory.filter(timestamp => now - timestamp < windowMs);

            // Check if limit exceeded
            if (validRequests.length >= max) {
                return res.status(429).json({
                    success: false,
                    error: message,
                    retryAfter: Math.ceil(windowMs / 1000) // seconds
                });
            }

            // Add current request
            validRequests.push(now);
            this.requests.set(ip, validRequests);

            // Clean up old entries periodically
            if (Math.random() < 0.01) { // 1% chance
                this.cleanup(windowMs);
            }

            next();
        };
    }

    /**
     * Clean up old entries from memory
     */
    cleanup(windowMs) {
        const now = Date.now();
        for (const [ip, timestamps] of this.requests.entries()) {
            const validRequests = timestamps.filter(timestamp => now - timestamp < windowMs);
            if (validRequests.length === 0) {
                this.requests.delete(ip);
            } else {
                this.requests.set(ip, validRequests);
            }
        }
    }
}

const limiter = new RateLimiter();

// Pre-configured limiters for common use cases

/**
 * General API rate limiter
 * 100 requests per 15 minutes
 */
const apiLimiter = limiter.createLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Trop de requêtes depuis cette IP, veuillez réessayer dans 15 minutes.'
});

/**
 * Strict rate limiter for authentication endpoints
 * 5 requests per 15 minutes
 */
const authLimiter = limiter.createLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes.'
});

/**
 * Moderate rate limiter for order creation
 * 10 requests per 10 minutes
 */
const orderLimiter = limiter.createLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10,
    message: 'Trop de commandes créées, veuillez réessayer dans 10 minutes.'
});

module.exports = {
    RateLimiter,
    apiLimiter,
    authLimiter,
    orderLimiter
};
