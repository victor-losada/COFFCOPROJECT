import { Router } from "express";
import { listarArchivos, registrarArchivos, eliminarArchivos, actualizarArchivos } from "../controllers/ArchivosController.js"
const rutaArchivo = Router()

rutaArchivo.get('/listar', listarArchivos)
rutaArchivo.post('/registrar', registrarArchivos)
rutaArchivo.delete('/eliminar/:id_documentos', eliminarArchivos)
rutaArchivo.put('/actualizar/:id_documentos', actualizarArchivos)

export default rutaArchivo