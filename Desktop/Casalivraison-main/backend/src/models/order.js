import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
            Order.belongsTo(models.DeliveryDriver, { foreignKey: 'deliveryDriverId', as: 'driver' });
            Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
        }
    }

    Order.init({
        totalPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        deliveryFee: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 15.00
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'VALIDATED', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED'),
            defaultValue: 'PENDING'
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deliveryDriverId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Order',
    });

    return Order;
};
