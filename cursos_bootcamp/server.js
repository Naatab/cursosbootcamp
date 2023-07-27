import express from "express";
import morgan from "morgan";
import { sequelize } from "./app/models/index.js";

import {
  createUser,
  findUserById,
  findAll as findAlluser,
  updateUserById,
  deleteUserById,
} from "./app/controllers/user.controller.js";

import {
  createBootcamp,
  addUser,
  findById,
  findAll as findAllbootcamp,
} from "./app/controllers/bootcamp.controller.js";
import { User } from "./app/models/user.model.js";
import { Bootcamp } from "./app/models/bootcamp.model.js";
import { UserBootcamp } from "./app/models/userBootcamp.model.js";

const main = async () => {
  try {
    const app = express();

    app.use(morgan("tiny"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Relacionar Controler con Modelos
    app.post("/user/createUser", createUser);
    app.get("/user/findUserById/:id", findUserById);
    app.get("/user/findAll", findAlluser);
    app.put("/user/updateUserById/:id", updateUserById);
    app.delete("/user/deleteUserById/:id", deleteUserById);

    app.post("/bootcamp/createBootcamp", createBootcamp);
    app.post("/bootcamp/addUser/:id", addUser);
    app.get("/bootcamp/findById/:id", findById);
    app.get("/bootcamp/findAll", findAllbootcamp);

    await sequelize.authenticate();
    console.log("conectado con éxito a la base de datos.");
    await sequelize.sync({ force: false, alter: true });

    User.belongsToMany(Bootcamp, {
      through: UserBootcamp,
      foreignKey: "userId",
    });
    Bootcamp.belongsToMany(User, {
      through: UserBootcamp,
      foreignKey: "bootcampId",
    });
    app.listen(3000, () =>
      console.log("Servidor escuchando en puerto: " + 3000)
    );
  } catch (error) {
    console.log("ha un ocurrido un error", error);
  }
};

main();

// Llamado postman http://localhost:3000/user/createUser
