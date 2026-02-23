import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
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
            allowNull: false,
            unique: true
        },
        vehicleType: {
            type: DataTypes.STRING,
            allowNull: true
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
