import db from "../database/database.js";

export default class Usuario {
    constructor(id, nombre, apellido, email, rut, estado) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.rut = rut;
        this.estado = estado;
    }

    static findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT * FROM USUARIOS",
                    values: [],
                };
                let resultado = await db.query(query);
                resolve(resultado.rows);
            } catch (error) {
                console.log("Error en findAll usuarios: ", error);
                reject(
                    "Error al obtener la información de usuarios en la base de datos."
                );
            }
        });
    }

    static findByRut(rut) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: "SELECT * FROM USUARIOS WHERE rut = $1",
                    values: [rut],
                };
                let resultado = await db.query(query);
                resolve(resultado.rows[0]);
            } catch (error) {
                console.log("Error en findByRut de usuarios: ", error);
                reject(
                    "Error al obtener la información de usuarios por rut en la base de datos."
                );
            }
        });
    }
}
