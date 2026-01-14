// services/log18Service.js
import { sequelize } from "../config/db.js";
import log18Model from "../models/log18.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo dentro del servicio
// Usamos un nombre genérico interno para no liar variables
const Model = log18Model.init(sequelize, DataTypes);

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
