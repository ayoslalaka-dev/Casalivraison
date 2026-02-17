import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import { env as configEnv } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

// On utilise directement l'objet env importé
const sequelize = new Sequelize(configEnv.DB_NAME, configEnv.DB_USER, configEnv.DB_PASSWORD, {
    host: configEnv.DB_HOST,
    port: configEnv.DB_PORT,
    dialect: 'postgres',
    logging: configEnv.NODE_ENV === 'development',
});

const files = fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    });

import { pathToFileURL } from 'url';

for (const file of files) {
    const modelPath = path.join(__dirname, file);
    const modelModule = await import(pathToFileURL(modelPath).href);
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize, Sequelize };
export default db;
