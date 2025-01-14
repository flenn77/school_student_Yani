const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const School = sequelize.define("School", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  adress: DataTypes.STRING,
  directorName: DataTypes.STRING,
});

module.exports = School;
