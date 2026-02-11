const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Restaurant extends Model {
        static associate(models) {
            Restaurant.hasMany(models.Menu, { foreignKey: 'restaurantId', as: 'menus' });
        }
    }

    Restaurant.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Restaurant',
    });

    return Restaurant;
};
