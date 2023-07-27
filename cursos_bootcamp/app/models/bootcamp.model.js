import { DataTypes } from "sequelize";
import { sequelize } from "../models/index.js";

export const Bootcamp = sequelize.define(
  "bootcamp",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cue: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
