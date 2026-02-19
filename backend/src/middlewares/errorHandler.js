export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (err, req, res, next) => {
    console.error('Error Stack:', err.stack);

    // If it's an AppError instance
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            success: false,
            message: err.message
        });
    }

    // TypeORM Query Errors
    if (err.name === 'QueryFailedError') {
        return res.status(400).json({
            status: 'error',
            success: false,
            message: 'Database operation failed'
        });
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

export default errorHandler;
