import { Router } from "express";
import { actualizarVariablesDeDocumento, asignarVariablesADocumento, logosUpdate, manageDocument, manageDocumentUpdate, obtenerVariablesDeDocumento, statusDocument, variableUpdate, versionUpdate } from "../controllers/GestionDocumental.js";
import upload from "../multer/multer.js";

const DocumentalRouter = Router()

DocumentalRouter.post('/documentos', upload.single('nombre'), manageDocument)
DocumentalRouter.patch('/documentupdate', manageDocumentUpdate)
DocumentalRouter.patch('/variableupdate', variableUpdate)
DocumentalRouter.patch('/logoUpdate', logosUpdate)
DocumentalRouter.put('/varsionupdate', versionUpdate)
DocumentalRouter.put('/stadoDocument/:iddocumentos', statusDocument)
DocumentalRouter.post('/variablesdocumentos',asignarVariablesADocumento)
DocumentalRouter.get('/variablesdocumentosget', obtenerVariablesDeDocumento)
DocumentalRouter.put('/variablesactualizardocumen', actualizarVariablesDeDocumento)


export default DocumentalRouter