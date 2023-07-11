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
                resolve(resultado.rows)
            } catch (error) {
                console.log("Error en findAll cuentas: ", error)
                reject("Error al obtener la información de cuentas en la base de datos.")
            }
        });
    }
}