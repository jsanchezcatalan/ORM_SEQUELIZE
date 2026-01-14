// controllers/base/categoriasBaseController.js
import * as service from "../../services/categoriasService.js";

export const crearCategoria = async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear categoria", error });
  }
};

// Aquí usamos modelClass que ahora garantiza ser diferente (ej: obtenerLogs)
export const obtenerCategorias = async (req, res) => {
  try {
    const lista = await service.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener categorias", error });
  }
};

export const obtenerCategoria = async (req, res) => {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener categoria", error });
  }
};

export const actualizarCategoria = async (req, res) => {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar categoria", error });
  }
};

export const eliminarCategoria = async (req, res) => {
  try {
    const exito = await service.remove(req.params.id);
    if (!exito) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Categoria eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar categoria", error });
  }
};
