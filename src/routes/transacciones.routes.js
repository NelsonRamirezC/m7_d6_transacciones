import { Router } from "express";
import { findAll, createTransaccion } from "../controllers/transacciones.controllers.js";
const router = Router();

router.get("/", findAll);

router.post("/", createTransaccion);

export default router;
