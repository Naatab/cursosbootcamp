// • Crear y guardar usuarios llamado createUser.
// • Obtener los Bootcamp de un usuario llamado findUserById.
// • Obtener todos los Usuarios incluyendo, los Bootcamp llamado findAll.
// • Actualizar usuario por Id llamado updateUserById.
// • Eliminar un usuario por Id llamado deleteUserById.
import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    console.log(req.body);
    const user = await User.create({
      firstName,
      lastName,
      email,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json({ code: 200, message: "OK", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error al crear usuario",
    });
  }
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);

    let user = await User.findOne({ where: { id: id } });
    res.json({ code: 200, message: "OK", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error al buscar usuario por su ID",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    let users = await User.findAll();
    res.json({ code: 200, message: "OK", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error al buscar todos los usuario",
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { firstName } = req.body;
    const { id } = req.params;
    console.log(req.body);
    console.log(req.params);
    let [rowsUpdated, [updatedUser]] = await User.update(
      { firstName: firstName },
      {
        where: { id: id },
        returning: true,
      }
    );

    res.json({ code: 200, message: "OK", data: [rowsUpdated, [updatedUser]] });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error al actualizar usuario",
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const deletedRows = await User.destroy({
      where: { id: id },
    });
    res.json({ code: 200, message: "OK", data: deletedRows });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Error al borrar usuario",
    });
  }
};
