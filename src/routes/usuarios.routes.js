import { Router } from "express";
import { findAll } from "../controllers/usuarios.controllers.js";

const router = Router();

router.get("/", findAll);

router.get("/:id", (req, res) => {
    res.send("ruta filtro usuarios por id");
});

router.post("/", (req, res) => {
    res.send("ruta crear usuarios");
});

export default router;
