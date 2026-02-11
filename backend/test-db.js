const { Sequelize } = require('sequelize');

const testConnection = async (password) => {
    const sequelize = new Sequelize('casalivraison', 'postgres', password, {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    });
    try {
        await sequelize.authenticate();
        console.log(`SUCCESS: Password "${password}" works!`);
        process.exit(0);
    } catch (error) {
        console.log(`FAILED: Password "${password}" - ${error.message}`);
    }
};

const passwords = ['postgres', '', 'root', 'admin', 'password', '12345', '123456'];

(async () => {
    for (const pw of passwords) {
        await testConnection(pw);
    }
})();
