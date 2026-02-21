const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);
const testConnection = async () => {
  try {
    await sequelize.authenticate();
onsole.log('Connexion à PostgreSQL réussie !');
  } catch (error) {
 console.error('Impossible de se connecter à PostgreSQL :', error);
  }
};

testConnection();

module.exports = sequelize;
