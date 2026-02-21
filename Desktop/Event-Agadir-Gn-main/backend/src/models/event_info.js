const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const EventInfo = sequelize.define("event_info", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  banner_url: { type: DataTypes.STRING, allowNull: true },
});

module.exports = { EventInfo };

