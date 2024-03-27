import { Router } from "express";

import { ListarDatos, RegistrarDatos, ActualizarDatos, ELiminarDatos, ListarIdDatos } from "../controllers/DatosController.js";
const ruta=Router()

ruta.get("/listar",ListarDatos)
ruta.post("/registrar",RegistrarDatos)
ruta.put("/actualizar/:id",ActualizarDatos)
ruta.delete("/eliminar/:id",ELiminarDatos)
ruta.get("/listarid/:id",ListarIdDatos)

export default ruta


