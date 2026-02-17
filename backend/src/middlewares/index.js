/**
 * Middleware Index
 * Exports all middlewares for easy importing
 */

const errorHandler = require('./errorHandler');
const notFound = require('./notFound');
const { authenticate, optionalAuth } = require('./authenticate');
const { authorize, isAdmin, isDriver, isClient, isOwner } = require('./authorize');
const asyncHandler = require('./asyncHandler');
const { apiLimiter, authLimiter, orderLimiter } = require('./rateLimiter');

module.exports = {
    // Error handling
    errorHandler,
    notFound,

    // Authentication
    authenticate,
    optionalAuth,

    // Authorization
    authorize,
    isAdmin,
    isDriver,
    isClient,
    isOwner,

    // Async handling
    asyncHandler,

    // Rate limiting
    apiLimiter,
    authLimiter,
    orderLimiter
};
