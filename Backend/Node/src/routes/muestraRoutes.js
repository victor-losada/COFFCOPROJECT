import { Router } from "express";
import { ListarMuestras, RegistrarMuestra, ActualizarMuestra,EliminarMuestra,ListaridMuestra } from "../controllers/muestraControllers.js";
const ruta=Router()

ruta.get("/listar",ListarMuestras)
ruta.post("/registrar",RegistrarMuestra)
ruta.put("/actualizar/:id",ActualizarMuestra)
ruta.delete("/eliminar/:id",EliminarMuestra)
ruta.get("/listarid/:id",ListaridMuestra)

export default ruta


