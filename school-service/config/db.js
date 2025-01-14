const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "schooldb",    // Nom de la DB
  process.env.POSTGRES_USER || "postgres",  // User
  process.env.POSTGRES_PASSWORD || "postgres", // Password
  {
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    dialect: "postgres",
  }
);

module.exports = sequelize;
