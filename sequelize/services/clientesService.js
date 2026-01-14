// services/clientesService.js
import { sequelize } from "../config/db.js";
import clientesModel from "../models/clientes.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo dentro del servicio
// Usamos un nombre genérico interno para no liar variables
const Model = clientesModel.init(sequelize, DataTypes);

export const create = async (data) => {
    return await Model.create(data);
};

export const findAll = async () => {
    return await Model.findAll();
};

export const findById = async (id) => {
    return await Model.findByPk(id);
};

export const update = async (id, data) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};

export const remove = async (id) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
