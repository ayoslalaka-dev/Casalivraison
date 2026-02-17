/**
 * Classe d'erreur personnalisée pour l'application.
 */
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Middleware global de gestion des erreurs.
 */
export const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err);

    // Gestion des erreurs d'instance AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    // Gestion des erreurs TypeORM (requête échouée)
    if (err.name === 'QueryFailedError') {
        return res.status(400).json({
            status: 'error',
            message: 'Database operation failed'
        });
    }

    // Gestion des erreurs de validation (si applicable)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    // Erreur par défaut (500)
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
};
