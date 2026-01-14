// controllers/base/clientesBaseController.js
import * as service from "../../services/clientesService.js";

export const crearCliente = async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear cliente", error });
  }
};

// Aquí usamos modelClass que ahora garantiza ser diferente (ej: obtenerLogs)
export const obtenerClientes = async (req, res) => {
  try {
    const lista = await service.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener clientes", error });
  }
};

export const obtenerCliente = async (req, res) => {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener cliente", error });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar cliente", error });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const exito = await service.remove(req.params.id);
    if (!exito) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar cliente", error });
  }
};
