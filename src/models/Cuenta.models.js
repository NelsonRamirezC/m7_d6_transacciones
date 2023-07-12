import db from "../database/database.js";

export default class Cuenta {
    constructor(id, idUsuario, nCuenta, tipoCuenta, saldo) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.nCuenta = nCuenta;
        this.tipoCuenta = tipoCuenta;
        this.saldo = saldo;
    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT * FROM CUENTAS",
                    values: [],
                };
                let resultado = await db.query(query);
                resolve(resultado.rows);
            } catch (error) {
                console.log("Error en findAll cuentas: ", error);
                reject(
                    "Error al obtener la información de cuentas en la base de datos."
                );
            }
        });
    }
    static findByNumeroCuenta(numeroCuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT * FROM CUENTAS where N_CUENTA = $1",
                    values: [numeroCuenta],
                };
                let resultado = await db.query(query);
                resolve(resultado.rows[0]);
            } catch (error) {
                console.log("Error en findByNumeroCuenta cuentas: ", error);
                reject(
                    "Error al obtener la información de cuentas  filtradas por número de cuenta en la base de datos."
                );
            }
        });
    }

    static descontarSaldo(saldo, numeroCuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "UPDATE CUENTAS SET SALDO = SALDO - $1 WHERE N_CUENTA = $2 returning *",
                    values: [saldo, numeroCuenta],
                };
                let resultado = await db.query(query);
                resolve(resultado.rows);
            } catch (error) {
                console.log("Error en descontar saldo: ", error);
                if (error.code) {
                    reject({ message: error.detail });
                } else {
                    reject({
                        message: "Error al realizar el descuento del saldo.",
                    });
                }
            }
        });
    }
    static agregarSaldo(saldo, numeroCuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "UPDATE CUENTAS SET SALDO = SALDO + $1 WHERE N_CUENTA = $2 returning *",
                    values: [saldo, numeroCuenta],
                };
                let resultado = await db.query(query);
                resolve(resultado.rows);
            } catch (error) {
                console.log("Error en agregar saldo: ", error);
                if (error.code) {
                    reject({ message: error.detail });
                } else {
                    reject({
                        message: "Error al agregar el saldo a la cuenta.",
                    });
                }
            }
        });
    }
}
