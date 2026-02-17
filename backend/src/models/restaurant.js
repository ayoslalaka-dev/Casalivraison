import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class Restaurant extends Model {
        static associate(models) {
            Restaurant.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
            Restaurant.hasMany(models.Menu, { foreignKey: 'restaurantId', as: 'menus' });
        }
    }

    Restaurant.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        deliveryTime: {
            type: DataTypes.STRING,
            allowNull: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Restaurant',
    });

    return Restaurant;
};
