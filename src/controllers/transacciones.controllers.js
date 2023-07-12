import Transaccion from "../models/Transaccion.models.js";

export const findAll = async (req, res) => {
    try {
        let transacciones = await Transaccion.findAll();
        res.json({ code: 200, message: "ok", data: transacciones });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al consultar las transacciones.",
        });
    }
};

export const createTransaccion = async (req, res) => {
    try {
        let { rutRemitente, rutdestinatario, cuentaOrigen, cuentaDestino, monto, tipoTransaccion, glosa } = req.body;
        let cuentas = await Transaccion.tranferir(rutRemitente, rutdestinatario, cuentaOrigen, cuentaDestino, monto, tipoTransaccion, glosa);
        res.json({ code: 200, message: "ok", data: cuentas });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error,
        });
    }
};
