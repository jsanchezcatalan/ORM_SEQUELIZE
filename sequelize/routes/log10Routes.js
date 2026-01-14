// routes/log10Routes.js
import express from "express";
import {
  crearLog10,
  obtenerLog10s,
  obtenerLog10,
  actualizarLog10,
  eliminarLog10
} from "../controllers/log10Controller.js";

const router = express.Router();

router.get("/", obtenerLog10s);
router.get("/:id", obtenerLog10);
router.post("/", crearLog10);
router.put("/:id", actualizarLog10);
router.delete("/:id", eliminarLog10);

export default router;
