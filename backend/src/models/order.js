// backend/src/models/order.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Order.belongsTo(models.DeliveryDriver, { foreignKey: 'deliveryDriverId', as: 'driver' });
            Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
        }
    }

    Order.init({
        status: {
            type: DataTypes.ENUM('PENDING', 'VALIDATED', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED'),
            defaultValue: 'PENDING'
        },
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        deliveryFee: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 20.00
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deliveryDriverId: {
            type: DataTypes.INTEGER,
            allowNull: true // Peut être null si pas encore assigné
        }
    }, {
        sequelize,
        modelName: 'Order',
    });

    return Order;
};
