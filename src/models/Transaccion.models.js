import db from "../database/database.js";
import Usuario from "./Usuario.models.js";
import Cuenta from "./Cuenta.models.js";

export default class Transaccion {
    constructor(
        id,
        fecha,
        cuentaOrigen,
        rutRemitente,
        cuentaDestinatario,
        rutDestinatario,
        tipoTransaccion,
        glosa,
        monto
    ) {
        this.id = id;
        this.fecha = fecha;
        this.cuentaOrigen = cuentaOrigen;
        this.rutRemitente = rutRemitente;
        this.cuentaDestinatario = cuentaDestinatario;
        this.rutDestinatario = rutDestinatario;
        this.tipoTransaccion = tipoTransaccion;
        this.glosa = glosa;
        this.monto = monto;
    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT * FROM TRANSACCIONES",
                    values: [],
                };
                let resultado = await db.query(query);
                resolve(resultado.rows);
            } catch (error) {
                console.log("Error en findAll transacciones: ", error);
                reject(
                    "Error al obtener la información de las transacciones de la base de datos."
                );
            }
        });
    }

    static tranferir(
        rutRemitente,
        rutDestinatario,
        cuentaOrigen,
        cuentaDestino,
        monto,
        tipoTransaccion,
        glosa
    ) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.query("BEGIN");
                //validaciones remitente
                let usuarioRemitente = await Usuario.findByRut(rutRemitente);
                if (!usuarioRemitente) {
                    throw new Error(
                        `Usuario remitente no existe en base de datos. `
                    );
                }
                if (usuarioRemitente.estado == false) {
                    throw new Error(
                        `Usuario remitente no habilitado para realizar operaciones. `
                    );
                }

                //validaciones destinatario
                let usuarioDestinatario = await Usuario.findByRut(
                    rutDestinatario
                );
                if (!usuarioDestinatario) {
                    throw new Error(
                        `Usuario destinatario no existe en base de datos. `
                    );
                }
                if (usuarioDestinatario.estado == false) {
                    throw new Error(
                        `Usuario destinatario no habilitado para realizar operaciones. `
                    );
                }
                //validar cuentas
                let cuentaRemitente = await Cuenta.findByNumeroCuenta(
                    cuentaOrigen
                );
                if (!cuentaRemitente) {
                    throw new Error(
                        `Cuenta ${cuentaOrigen} no existe en base de datos. `
                    );
                }
                let cuentaDestinatario = await Cuenta.findByNumeroCuenta(
                    cuentaDestino
                );
                if (!cuentaDestinatario) {
                    throw new Error(
                        `Cuenta ${cuentaDestino} no existe en base de datos. `
                    );
                }
                //verificar que cuenta remitente corresponda a usuario remitente.
                if (cuentaRemitente.id_usuario == usuarioRemitente.id) {
                    await Cuenta.descontarSaldo(monto, cuentaOrigen);
                } else {
                    throw new Error(
                        `Cuenta ${cuentaOrigen} no pertenece al usuario con rut ${usuarioRemitente.rut} `
                    );
                }
                if (cuentaDestinatario.id_usuario == usuarioDestinatario.id) {
                    await Cuenta.agregarSaldo(monto, cuentaDestino);
                } else {
                    throw new Error(
                        `Cuenta ${cuentaDestino} no pertenece al usuario con rut ${usuarioDestinatario.rut} `
                    );
                }
                let queryTransaccion = {
                    text: `INSERT INTO TRANSACCIONES VALUES (DEFAULT, DEFAULT, $1, $2, $3,$4, $5, $6, $7) RETURNING *`,
                    values: [
                        cuentaOrigen,
                        rutRemitente,
                        rutDestinatario,
                        cuentaDestino,
                        tipoTransaccion,
                        glosa,
                        monto,
                    ],
                };
                let result = await db.query(queryTransaccion);
                let transaccion = result.rows[0];
                resolve(
                    `Se ha realizado con éxito la transacción con id ${transaccion.id}`
                );

                await db.query("COMMIT");
            } catch (error) {
                await db.query("ROLLBACK");
                console.log("Error al realizar la transferencia", error);
                if (error.code) {
                    console.log(error.code);
                    reject(error.detail);
                } else {
                    reject(error.message);
                }
            }
        });
    }
}
