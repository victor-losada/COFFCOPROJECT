import { Router } from "express";
import { tipodocStatus, tipodocuUpdate, tiposdocuGet, tiposdocuRegister } from "../controllers/TipoDocumento.js";


const tipoDocumRouter = Router()

tipoDocumRouter.post('/tipodocregister', tiposdocuRegister)
tipoDocumRouter.get('/tipodocuget', tiposdocuGet)
tipoDocumRouter.patch('/tipodocuupdate/:idtipoDocumento',tipodocuUpdate)
tipoDocumRouter.put('/tipodocustatus/:idtipoDocumento', tipodocStatus)

export default tipoDocumRouter