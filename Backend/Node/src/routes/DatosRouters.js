import { Router } from "express";

import { ListarDatos, RegistrarDatos, ActualizarDatos, ELiminarDatos, ListarIdDatos } from "../controllers/DatosController.js";
const rutaDatos=Router()

rutaDatos.get("/listar",ListarDatos)
rutaDatos.post("/registrar",RegistrarDatos)
rutaDatos.put("/actualizar/:id",ActualizarDatos)
rutaDatos.delete("/eliminar/:id",ELiminarDatos)
rutaDatos.get("/listarid/:id",ListarIdDatos)

export default rutaDatos


