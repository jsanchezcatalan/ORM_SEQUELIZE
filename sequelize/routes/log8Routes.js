// routes/log8Routes.js
import express from "express";
import {
  crearLog8,
  obtenerLog8s,
  obtenerLog8,
  actualizarLog8,
  eliminarLog8
} from "../controllers/log8Controller.js";

const router = express.Router();

router.get("/", obtenerLog8s);
router.get("/:id", obtenerLog8);
router.post("/", crearLog8);
router.put("/:id", actualizarLog8);
router.delete("/:id", eliminarLog8);

export default router;
