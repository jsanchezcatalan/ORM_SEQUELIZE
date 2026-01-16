// routes/carlos46Routes.js
import express from "express";
import {
  crearCarlos46,
  obtenerCarlos46s,
  obtenerCarlos46,
  actualizarCarlos46,
  eliminarCarlos46
} from "../controllers/carlos46Controller.js";

const router = express.Router();

router.get("/", obtenerCarlos46s);
router.get("/:id", obtenerCarlos46);
router.post("/", crearCarlos46);
router.put("/:id", actualizarCarlos46);
router.delete("/:id", eliminarCarlos46);

export default router;
