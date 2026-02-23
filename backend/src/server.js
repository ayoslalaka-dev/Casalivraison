/*
ARBORESCENCE DU PROJET:
.
├── backend
│   ├── config
│   │   ├── database.js (TypeORM DataSource)
│   │   └── env.js
│   ├── src
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── orderController.js
│   │   │   └── restaurantController.js
│   │   ├── entities (TypeORM)
│   │   │   ├── User.js
│   │   │   ├── Category.js
│   │   │   ├── Restaurant.js
│   │   │   ├── Menu.js
│   │   │   ├── Order.js
│   │   │   ├── OrderItem.js
│   │   │   └── DeliveryDriver.js
│   │   ├── middlewares
│   │   │   ├── errorHandler.js
│   │   │   ├── notFound.js
│   │   │   ├── authenticate.js
│   │   │   ├── authorize.js
│   │   │   ├── asyncHandler.js
│   │   │   ├── rateLimiter.js
│   │   │   └── index.js
│   │   ├── routes
│   │   │   ├── index.js
│   │   │   ├── auth.js
│   │   │   ├── orders.js
│   │   │   └── restaurants.js
│   │   ├── services
│   │   │   ├── authService.js
│   │   │   ├── orderService.js
│   │   │   └── restaurantService.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── README.md
*/

// backend/src/server.js
import 'reflect-metadata';
import { AppDataSource } from './config/database.js';
import { env } from './config/env.js';
import app from './app.js';

const PORT = env.PORT;

const startServer = async () => {
    let connected = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!connected && attempts < maxAttempts) {
        try {
            attempts++;

            // Initialize TypeORM DataSource
            await AppDataSource.initialize();
            console.log('✅ Database connected successfully (TypeORM)');
            connected = true;

            // Seed guest user if auth is removed completely
            const userRepository = AppDataSource.getRepository('User');
            let guestUser = await userRepository.findOne({ where: { email: 'guest@casalivraison.ma' } });
            if (!guestUser) {
                guestUser = userRepository.create({
                    name: 'Invité Casablanca',
                    email: 'guest@casalivraison.ma',
                    password: 'no-password-needed',
                    phone: '0000000000',
                    address: 'Casablanca',
                    role: 'CLIENT'
                });
                await userRepository.save(guestUser);
                console.log('🌱 Seeded default guest user');
            }


            // Start server
            app.listen(PORT, () => {
                console.log(`🚀 Server running on port ${PORT}`);
                console.log(`📊 Environment: ${env.NODE_ENV}`);
            });

        } catch (error) {
            console.error(`❌ Database connection attempt ${attempts} failed:`, error);
            if (attempts < maxAttempts) {
                console.log('⏳ Retrying in 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.error('💥 Max connection attempts reached. Exiting.');
                process.exit(1);
            }
        }
    }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('⚠️  SIGTERM received, closing database connection...');
    await AppDataSource.destroy();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('⚠️  SIGINT received, closing database connection...');
    await AppDataSource.destroy();
    process.exit(0);
});

startServer();
