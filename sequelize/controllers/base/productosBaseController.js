// controllers/base/productosBaseController.js
import * as service from "../../services/productosService.js";

export const crearProducto = async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear producto", error });
  }
};

// Aquí usamos modelClass que ahora garantiza ser diferente (ej: obtenerLogs)
export const obtenerProductos = async (req, res) => {
  try {
    const lista = await service.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener producto", error });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const exito = await service.remove(req.params.id);
    if (!exito) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
};
