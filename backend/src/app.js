// backend/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Sécurité
const morgan = require('morgan'); // Logging
const routes = require('./routes'); // Router centralisé
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express();

// Middlewares globaux
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API (préfixé par /api/v1 pour versioning)
app.use('/api/v1', routes);

// Gestion des erreurs 404
app.use(notFound);

// Gestion globale des erreurs
app.use(errorHandler);

module.exports = app;
