import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const UserBootcamp = sequelize.define("UserBootcamp", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  bootcampId: {
    type: DataTypes.INTEGER,
  },
  
});
