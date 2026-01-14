// routes/log5Routes.js
import express from "express";
import {
  crearLog5,
  obtenerLog5s,
  obtenerLog5,
  actualizarLog5,
  eliminarLog5
} from "../controllers/log5Controller.js";

const router = express.Router();

router.get("/", obtenerLog5s);
router.get("/:id", obtenerLog5);
router.post("/", crearLog5);
router.put("/:id", actualizarLog5);
router.delete("/:id", eliminarLog5);

export default router;
