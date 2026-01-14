// controllers/base/pedidosBaseController.js
import * as service from "../../services/pedidosService.js";

export const crearPedido = async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear pedido", error });
  }
};

// Aquí usamos modelClass que ahora garantiza ser diferente (ej: obtenerLogs)
export const obtenerPedidos = async (req, res) => {
  try {
    const lista = await service.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedidos", error });
  }
};

export const obtenerPedido = async (req, res) => {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener pedido", error });
  }
};

export const actualizarPedido = async (req, res) => {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar pedido", error });
  }
};

export const eliminarPedido = async (req, res) => {
  try {
    const exito = await service.remove(req.params.id);
    if (!exito) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar pedido", error });
  }
};
