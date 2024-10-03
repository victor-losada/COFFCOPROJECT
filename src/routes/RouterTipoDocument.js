import { Router } from "express";
import { tipodocStatus, tipodocuUpdate, tiposdocuGet, tiposdocuRegister } from "../controllers/TipoDocumento.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const tipoDocumRouter = Router()

tipoDocumRouter.post('/tipodocregister',validationToken, verificarRol([1]), tiposdocuRegister)
tipoDocumRouter.get('/tipodocuget',validationToken, verificarRol([1]), tiposdocuGet)
tipoDocumRouter.patch('/tipodocuupdate/:idtipoDocumento',validationToken, verificarRol([1]),tipodocuUpdate)
tipoDocumRouter.put('/tipodocustatus/:idtipoDocumento',validationToken, verificarRol([1]), tipodocStatus)

export default tipoDocumRouter