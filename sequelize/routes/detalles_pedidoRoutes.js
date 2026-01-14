// routes/detalles_pedidoRoutes.js
import express from "express";
import {
  crearDetalles_pedido,
  obtenerDetalles_pedidos,
  obtenerDetalles_pedido,
  actualizarDetalles_pedido,
  eliminarDetalles_pedido
} from "../controllers/detalles_pedidoController.js";

const router = express.Router();

router.get("/", obtenerDetalles_pedidos);
router.get("/:id", obtenerDetalles_pedido);
router.post("/", crearDetalles_pedido);
router.put("/:id", actualizarDetalles_pedido);
router.delete("/:id", eliminarDetalles_pedido);

export default router;
