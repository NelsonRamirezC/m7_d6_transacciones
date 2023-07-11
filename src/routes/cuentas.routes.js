import { Router } from "express";
import {findAll} from "../controllers/cuentas.controllers.js"
const router = Router();

router.get("/", findAll);

router.get("/:id", (req, res) => {
    res.send("ruta filtro cuentas por id");
});

router.post("/", (req, res) => {
    res.send("ruta crear cuentas");
});

export default router;
