import { Router } from "express";
import { actualizarVariablesDeDocumento, asignarVariablesADocumento, logosUpdate, manageDocument, manageDocumentUpdate, obtenerVariablesDeDocumento, statusDocument, variableUpdate, versionUpdate } from "../controllers/GestionDocumental.js";
import upload from "../multer/multer.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";

const DocumentalRouter = Router()

DocumentalRouter.post('/documentos',validationToken, verificarRol([1]), upload.single('nombre'), manageDocument)
DocumentalRouter.patch('/documentupdate',validationToken, verificarRol([1]), manageDocumentUpdate)
DocumentalRouter.patch('/variableupdate',validationToken, verificarRol([1]), variableUpdate)
DocumentalRouter.patch('/logoUpdate',validationToken, verificarRol([1]), logosUpdate)
DocumentalRouter.put('/varsionupdate',validationToken, verificarRol([1]), versionUpdate)
DocumentalRouter.put('/stadoDocument/:iddocumentos', validationToken, verificarRol([1]),statusDocument)
DocumentalRouter.post('/variablesdocumentos',validationToken, verificarRol([1]), asignarVariablesADocumento)
DocumentalRouter.get('/variablesdocumentosget',validationToken, verificarRol([1]), obtenerVariablesDeDocumento)
DocumentalRouter.put('/variablesactualizardocumen',validationToken, verificarRol([1]), actualizarVariablesDeDocumento)


export default DocumentalRouter