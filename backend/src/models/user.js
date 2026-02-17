import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.ENUM('CLIENT', 'ADMIN', 'DRIVER'),
            defaultValue: 'CLIENT'
        }
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};
