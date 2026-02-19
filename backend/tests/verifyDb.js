import 'reflect-metadata';
import { AppDataSource } from '../src/config/database.js';

async function testConnection() {
    console.log('🔍 Testing database connection...');
    try {
        await AppDataSource.initialize();
        console.log('✅ Database connection established successfully (TypeORM)!');

        // Try a simple query
        const result = await AppDataSource.query('SELECT NOW()');
        console.log('🕒 Database time:', result[0].now);

        await AppDataSource.destroy();
        console.log('👋 Connection closed.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}

testConnection();
