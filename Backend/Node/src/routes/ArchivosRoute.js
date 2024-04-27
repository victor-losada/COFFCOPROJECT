import { Router } from "express";
import { listarArchivos, registrarArchivos, eliminarArchivos, actualizarArchivos } from "../controllers/ArchivosController.js"
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateCargarDocs } from "../../validation/CargaDocsValidations.js";
const rutaArchivo = Router()

rutaArchivo.get('/listar',validarToken,listarArchivos)
rutaArchivo.post('/registrar', validarToken,validateCargarDocs,registrarArchivos)
rutaArchivo.delete('/eliminar/:id_documentos',validarToken, eliminarArchivos)
rutaArchivo.put('/actualizar/:id_documentos',validateCargarDocs, validarToken,actualizarArchivos)

export default rutaArchivo