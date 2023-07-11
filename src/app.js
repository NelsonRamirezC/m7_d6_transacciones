import express from "express";
import morgan from "morgan";
import usuariosRoutes from "./routes/usuarios.routes.js";
import cuentasRoutes from "./routes/cuentas.routes.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));


//endpoints
app.use("/api/v1/usuarios", usuariosRoutes);
app.use("/api/v1/cuentas", cuentasRoutes);


export default app;