import { Router } from "express";
import { listarArchivos, registrarArchivos, eliminarArchivos, actualizarArchivos } from "../controllers/ArchivosController.js"
const rutaArchivo = Router()

rutaArchivo.get('/listar', listarArchivos)
rutaArchivo.post('/registrar', registrarArchivos)
rutaArchivo.delete('/eliminar/:id', eliminarArchivos)
rutaArchivo.put('/actualizar/:id', actualizarArchivos)

export default rutaArchivo