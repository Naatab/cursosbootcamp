// • Crear y guardar un nuevo Bootcamp llamado createBootcamp.
// • Agregar un Usuario al Bootcamp llamado addUser.
// • Obtener los Bootcamp por id llamado findById.
// • Obtener todos los Usuarios incluyendo los Bootcamp llamado findAll.
// import Bootcamp from "../models/bootcamp.model";

import { Bootcamp } from "../models/bootcamp.model.js";
import { User } from "../models/user.model.js";

export const createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;
    console.log(req.body);
    const bootcamp = await Bootcamp.create({
      title,
      cue,
      description,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json({ code: 200, message: "OK", data: bootcamp });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error al crear bootcamp",
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(req.body);
    const { id: bootcampId } = req.params;
    console.log(req.params);
    
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    console.log(bootcamp.dataValues);
    if (!bootcamp) {
      throw new Error("Bootcamp no encontrado");
    }

    const user = await User.findByPk(userId);
    console.log(user.dataValues);

    if (!bootcamp) {
      throw new Error("Usuario no encontrado");
    }

    const result = await user.addBootcamp(bootcamp);

    res.json({
      code: 200,
      message: "OK",
      data: "Usuario añadido al bootcamp correctamente.",
    });

    console.log("Usuario añadido al bootcamp correctamente.");
  } catch (error) {
    //console.log(error);
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);

    let bootcamp = await Bootcamp.findOne({ where: { id: id } });
    res.json({ code: 200, message: "OK", data: bootcamp });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error al buscar usuario por ID.",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    let bootcamps = await User.findAll();
    res.json({ code: 200, message: "OK", data: bootcamps });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error al buscar usuarios y bootcamp",
    });
  }
};
