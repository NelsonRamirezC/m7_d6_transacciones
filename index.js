import db from "./src/database/database.js";
import app from "./src/app.js";

const main = async () => {
    try {
        await db.connect();
        console.log("Base de datos conectada.");
        let servidor = app.listen(3000);
        console.log("API escuchando en puerto 3000.");
    } catch (error) {
        console.log(error);
    }
};

main();
