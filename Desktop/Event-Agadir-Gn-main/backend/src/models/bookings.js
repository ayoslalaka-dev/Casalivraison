const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Booking = sequelize.define("bookings", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  nb_tickets: { type: DataTypes.INTEGER, allowNull: false },
  confirmation_code: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = { Booking };

