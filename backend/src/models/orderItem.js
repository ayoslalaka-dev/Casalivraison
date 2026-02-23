import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class OrderItem extends Model {
        static associate(models) {
            OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
            OrderItem.belongsTo(models.Menu, { foreignKey: 'menuId', as: 'menu' });
        }
    }

    OrderItem.init({
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        menuId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'OrderItem',
    });

    return OrderItem;
};
