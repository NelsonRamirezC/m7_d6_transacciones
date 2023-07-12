import Cuenta from "../models/Cuenta.models.js"

export const findAll = async (req, res) => {
    try {
        let cuentas = await Cuenta.findAll();
        res.json({code:  200, message: "ok", data: cuentas})
    } catch (error) {
        res.status(500).json({code: 500, message: "Error al consultar las cuentas."})
    }
};
