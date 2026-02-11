// backend/src/models/category.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Restaurant, { foreignKey: 'categoryId', as: 'restaurants' });
        }
    }

    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Category',
    });

    return Category;
};
