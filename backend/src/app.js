import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
import { errorMiddleware } from './Mildwares/error.js';
import notFound from './middlewares/notFound.js';

const app = express();

// Middlewares globaux
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes API
app.use('/api/v1', routes);

// Gestion des erreurs 404
app.use(notFound);

// Gestion globale des erreurs (Utilisation du nouveau middleware Mildwares/error.js)
app.use(errorMiddleware);

export default app;
