/*
ARBORESCENCE DU PROJET:
.
├── backend
│   ├── config
│   │   └── database.js
│   ├── src
│   │   ├── controllers
│   │   │   ├── authController.js
│   │   │   ├── orderController.js
│   │   │   └── restaurantController.js
│   │   ├── middlewares
│   │   │   ├── errorHandler.js
│   │   │   └── notFound.js
│   │   ├── models
│   │   │   ├── index.js
│   │   │   ├── user.js
│   │   │   └── ...
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
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const app = require('./app');

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    let connected = false;
    let attempts = 0;
    const maxAttempts = 3;

    while (!connected && attempts < maxAttempts) {
        try {
            attempts++;
            await sequelize.authenticate();
            console.log('Database connected successfully.');
            connected = true;

            // Sync models - En dev seulement. En prod, utiliser les migrations.
            if (process.env.NODE_ENV === 'development') {
                await sequelize.sync();
                console.log('Database synced.');
            }

            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        } catch (error) {
            console.error(`Database connection attempt ${attempts} failed:`, error.message);
            if (attempts < maxAttempts) {
                console.log('Retrying in 5 seconds...');
                await new Promise(resolve => setTimeout(resolve, 5000));
            } else {
                console.error('Max connection attempts reached. Exiting.');
                process.exit(1);
            }
        }
    }
};

startServer();
