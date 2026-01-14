// controllers/base/detalles_pedidoBaseController.js
import * as service from "../../services/detalles_pedidoService.js";

export const crearDetalles_pedido = async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear detalles_pedido", error });
  }
};

// Aquí usamos modelClass que ahora garantiza ser diferente (ej: obtenerLogs)
export const obtenerDetalles_pedidos = async (req, res) => {
  try {
    const lista = await service.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

export const obtenerDetalles_pedido = async (req, res) => {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

export const actualizarDetalles_pedido = async (req, res) => {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar detalles_pedido", error });
  }
};

export const eliminarDetalles_pedido = async (req, res) => {
  try {
    const exito = await service.remove(req.params.id);
    if (!exito) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Detalles_pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar detalles_pedido", error });
  }
};
