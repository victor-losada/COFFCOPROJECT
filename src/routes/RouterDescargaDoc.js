import { Router } from "express";
import { descargaDocumento } from "../controllers/DescargaDocumento.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const downloaDocRouter = Router()

downloaDocRouter.get('/descargadocument/:iddocumentos',validationToken, verificarRol([1]), descargaDocumento)

export default downloaDocRouter