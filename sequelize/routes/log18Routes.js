// routes/log18Routes.js
import express from "express";
import {
  crearLog18,
  obtenerLog18s,
  obtenerLog18,
  actualizarLog18,
  eliminarLog18
} from "../controllers/log18Controller.js";

const router = express.Router();

router.get("/", obtenerLog18s);
router.get("/:id", obtenerLog18);
router.post("/", crearLog18);
router.put("/:id", actualizarLog18);
router.delete("/:id", eliminarLog18);

export default router;
