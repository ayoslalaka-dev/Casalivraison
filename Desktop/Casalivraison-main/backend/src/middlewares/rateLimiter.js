class RateLimiter {
    constructor() {
        this.requests = new Map();
    }

    createLimiter({ windowMs = 15 * 60 * 1000, max = 100, message = 'Too many requests, please try again later.' } = {}) {
        return (req, res, next) => {
            const ip = req.ip || req.connection.remoteAddress;
            const now = Date.now();

            if (!this.requests.has(ip)) {
                this.requests.set(ip, []);
            }

            const requestHistory = this.requests.get(ip);
            const validRequests = requestHistory.filter(timestamp => now - timestamp < windowMs);

            if (validRequests.length >= max) {
                return res.status(429).json({
                    status: 'error',
                    success: false,
                    message,
                    retryAfter: Math.ceil(windowMs / 1000)
                });
            }

            validRequests.push(now);
            this.requests.set(ip, validRequests);

            if (Math.random() < 0.01) {
                this.cleanup(windowMs);
            }

            next();
        };
    }

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

export const apiLimiter = limiter.createLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again in 15 minutes.'
});

export const orderLimiter = limiter.createLimiter({

    windowMs: 10 * 60 * 1000,
    max: 20,
    message: 'Too many orders created, please try again in 10 minutes.'
});

export { RateLimiter };
