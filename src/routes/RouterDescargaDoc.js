import { Router } from "express";
import { descargaDocumento } from "../controllers/DescargaDocumento.js";


const downloaDocRouter = Router()

downloaDocRouter.get('/descargadocument/:iddocumentos', descargaDocumento)

export default downloaDocRouter