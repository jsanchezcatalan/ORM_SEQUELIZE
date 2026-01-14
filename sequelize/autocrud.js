// autocrud.js
import fs from "fs";
import path from "path";

// Definición de carpetas
const modelsPath = "./models";
const servicesPath = "./services";
const controllersBasePath = "./controllers/base";
const controllersPath = "./controllers";
const routesPath = "./routes";

// Crear carpetas si no existen
fs.mkdirSync(servicesPath, { recursive: true });
fs.mkdirSync(controllersBasePath, { recursive: true });
fs.mkdirSync(controllersPath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });

// Filtramos solo los modelos (sin incluir init-models.js)
const models = fs.readdirSync(modelsPath)
  .filter(f => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); // ejemplo: log
  
  // Variables de nombres para usar en el código generado
  // 1. Calculamos el singular
  const singular = modelName.replace(/s$/, ""); // log
  const singularCapitalized = singular.charAt(0).toUpperCase() + singular.slice(1); // Log
  
  // 2. Calculamos el nombre de la clase (Plural o Generico)
  let modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); // Log

  // 🔥 CORRECCIÓN DEL BUG: 
  // Si el nombre de la clase (Plural) es igual al Singular (ej: Log == Log),
  // forzamos una 's' al final para diferenciar "obtenerLogs" de "obtenerLog"
  if (modelClass === singularCapitalized) {
      modelClass = modelClass + "s"; // Se convierte en "Logs"
  }

  // =========================================================
  // 1. GENERAR SERVICIO (Capa de Acceso a Datos)
  // =========================================================
  const serviceContent = `// services/${modelName}Service.js
import { sequelize } from "../config/db.js";
import ${modelName}Model from "../models/${modelFile}";
import { DataTypes } from "sequelize";

// Inicializamos el modelo dentro del servicio
// Usamos un nombre genérico interno para no liar variables
const Model = ${modelName}Model.init(sequelize, DataTypes);

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
`;
  fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);


  // =========================================================
  // 2. GENERAR CONTROLADOR BASE (Lógica Genérica)
  // =========================================================
  const controllerBaseContent = `// controllers/base/${modelName}BaseController.js
import * as service from "../../services/${modelName}Service.js";

export const crear${singularCapitalized} = async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear ${singular}", error });
  }
};

// Aquí usamos modelClass que ahora garantiza ser diferente (ej: obtenerLogs)
export const obtener${modelClass} = async (req, res) => {
  try {
    const lista = await service.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${modelName}", error });
  }
};

export const obtener${singularCapitalized} = async (req, res) => {
  try {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener ${singular}", error });
  }
};

export const actualizar${singularCapitalized} = async (req, res) => {
  try {
    const item = await service.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar ${singular}", error });
  }
};

export const eliminar${singularCapitalized} = async (req, res) => {
  try {
    const exito = await service.remove(req.params.id);
    if (!exito) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "${singularCapitalized} eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar ${singular}", error });
  }
};
`;
  fs.writeFileSync(`${controllersBasePath}/${modelName}BaseController.js`, controllerBaseContent);


  // =========================================================
  // 3. GENERAR CONTROLADOR FINAL (Herencia / Custom)
  // =========================================================
  const controllerFinalPath = `${controllersPath}/${modelName}Controller.js`;
  
  if (!fs.existsSync(controllerFinalPath)) {
      const controllerContent = `// controllers/${modelName}Controller.js
import * as base from "./base/${modelName}BaseController.js";

// Herencia implícita: Exportamos todo lo del base
export * from "./base/${modelName}BaseController.js";

// Si quieres sobrescribir una función, defínela aquí abajo con el mismo nombre.
// Ejemplo:
// export const crear${singularCapitalized} = async (req, res) => {
//     console.log("Validación extra antes de crear...");
//     await base.crear${singularCapitalized}(req, res);
// };
`;
      fs.writeFileSync(controllerFinalPath, controllerContent);
      console.log(`✨ Controlador Extendido creado: ${modelName}Controller.js`);
  } else {
      console.log(`⏭️ Controlador Extendido ya existe (se respeta): ${modelName}Controller.js`);
  }


  // =========================================================
  // 4. GENERAR RUTAS
  // =========================================================
  const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import {
  crear${singularCapitalized},
  obtener${modelClass},
  obtener${singularCapitalized},
  actualizar${singularCapitalized},
  eliminar${singularCapitalized}
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", obtener${modelClass});
router.get("/:id", obtener${singularCapitalized});
router.post("/", crear${singularCapitalized});
router.put("/:id", actualizar${singularCapitalized});
router.delete("/:id", eliminar${singularCapitalized});

export default router;
`;
  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);
  console.log(`✅ CRUD generado para: ${modelName}`);
}

console.log("🎉 Arquitectura MVC + Services generada correctamente.");