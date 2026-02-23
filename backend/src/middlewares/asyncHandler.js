/**
 * Async Handler Middleware
 * Wraps async route handlers to catch errors automatically
 * Eliminates the need for try-catch blocks in every controller
 */

/**
 * Wraps an async function to catch errors and pass to error handler
 * 
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware
 * 
 * @example
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await User.findAll();
 *   res.json(users);
 * }));
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
