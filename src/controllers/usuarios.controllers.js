import Usuario from "../models/Usuario.models.js";
export const findAll = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll();
        res.json({ code: 200, message: "ok", data: usuarios });
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al consultar los usuarios."})
    }
};
