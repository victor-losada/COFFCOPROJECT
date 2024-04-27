import { Router } from "express";
import { listarDocumentos, registrarDocumentos, eliminarDocumentos, actalizardocumentos } from "../controllers/DocumentosController.js"
import { validarToken } from "../controllers/AutentificacionLogin.js";
import { validateCargarDocs } from "../../validation/CargaDocsValidations.js";
const DocumentosController = Router()

DocumentosController.get('/listar',validarToken,listarDocumentos)
DocumentosController.post('/registrar', validarToken,validateCargarDocs,registrarDocumentos)
DocumentosController.delete('/eliminar/:id_documentos',validarToken, eliminarDocumentos)
DocumentosController.put('/actualizar/:id_documentos', validarToken,validateCargarDocs,actalizardocumentos)

export default DocumentosController