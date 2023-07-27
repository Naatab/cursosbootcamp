import Sequelize from "sequelize";
import pg from "pg";
import { configDB } from "../config/db.config.js";

export const sequelize = new Sequelize(
  configDB.database,
  configDB.username,
  configDB.password,
  {
    host: configDB.host,
    port: configDB.port || 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 20000,
      idle: 5000,
    },
    //dialectOptions,
    dialectModule: pg,
  }
);
