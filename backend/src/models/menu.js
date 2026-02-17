import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Menu extends Model {
        static associate(models) {
            Menu.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
        }
    }

    Menu.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        restaurantId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Menu',
    });

    return Menu;
};
