// backend/src/models/deliveryDriver.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class DeliveryDriver extends Model {
        static associate(models) {
            DeliveryDriver.hasMany(models.Order, { foreignKey: 'deliveryDriverId', as: 'orders' });
        }
    }

    DeliveryDriver.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('AVAILABLE', 'BUSY', 'OFFLINE'),
            defaultValue: 'AVAILABLE'
        }
    }, {
        sequelize,
        modelName: 'DeliveryDriver',
    });

    return DeliveryDriver;
};
