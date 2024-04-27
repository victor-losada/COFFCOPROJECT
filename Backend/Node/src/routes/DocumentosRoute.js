import { Router } from "express";
import { listarDocumentos, registrarDocumentos, eliminarDocumentos, actalizardocumentos, ListaridDocumentos, editarEstadoDocumento } from "../controllers/DocumentosController.js"
import { validarToken} from "../controllers/AutentificacionLogin.js";
import { validateCargarDocs } from "../validation/CargaDocsValidations.js";
const DocumentosController = Router()

DocumentosController.get('/listar',listarDocumentos)
DocumentosController.post('/registrar', validarToken,validateCargarDocs,registrarDocumentos)
DocumentosController.delete('/eliminar/:id_documentos',validarToken, eliminarDocumentos)
DocumentosController.put('/actualizar/:id_documentos',validateCargarDocs,actalizardocumentos)
DocumentosController.get('/listarid',validarToken,ListaridDocumentos)
DocumentosController.put('/documentoEstado/:id_documento', validarToken, editarEstadoDocumento);


export default DocumentosController