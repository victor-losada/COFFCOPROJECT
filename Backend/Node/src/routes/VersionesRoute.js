import { Router } from "express";
import { ListaridVersiones, actualizarVersiones, eliminarVersiones, listarVersiones, registrarVersiones } from "../controllers/VersionesController.js";

const rutaVersion = Router()

rutaVersion.get('/listar', listarVersiones)
rutaVersion.post('/registrar', registrarVersiones)
rutaVersion.delete('/eliminar/:id_formato', eliminarVersiones)
rutaVersion.put('/actualizar/:id_formato', actualizarVersiones)
rutaVersion.get('/listarid/:id_formato', ListaridVersiones)


export default rutaVersion