import { DataSource } from 'typeorm';
import { env } from './env.js';
import { User } from '../entities/User.js';
import { Category } from '../entities/Category.js';
import { Restaurant } from '../entities/Restaurant.js';
import { Menu } from '../entities/Menu.js';
import { Order } from '../entities/Order.js';
import { OrderItem } from '../entities/OrderItem.js';
import { DeliveryDriver } from '../entities/DeliveryDriver.js';
import { RefreshToken } from '../entities/RefreshToken.js';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize: env.NODE_ENV === 'development',
    logging: env.NODE_ENV === 'development',
    entities: [User, Category, Restaurant, Menu, Order, OrderItem, DeliveryDriver, RefreshToken],
    // migrations: ['src/migrations/*.js'], // Legacy Sequelize migrations conflict with TypeORM ESM
    subscribers: [],
});
console.log("log ,env",env.DB_USER)
