import dotenv from 'dotenv';
dotenv.config();

export const env = {
    // Database
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    DB_USER: process.env.DB_USER || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DB_NAME: process.env.DB_NAME || 'casalivraison',

    // JWT
    JWT_SECRET: process.env.JWT_SECRET || 'casalivraison-secret-key',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'casalivraison-refresh-secret-key',
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

    // Server
    PORT: parseInt(process.env.PORT || '5001'),
    NODE_ENV: process.env.NODE_ENV || 'development',
};
