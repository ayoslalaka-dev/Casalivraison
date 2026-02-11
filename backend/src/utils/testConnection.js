// backend/src/utils/testConnection.js
const { Sequelize } = require('sequelize');
const config = require('../../config/database');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        port: dbConfig.port,
        logging: false,
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Connected to database: ${dbConfig.database} on host: ${dbConfig.host}`);
        process.exit(0);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

testConnection();
