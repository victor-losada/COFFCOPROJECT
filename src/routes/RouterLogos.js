import { Router } from "express"
import { actualizarLogo, cambiarEstadoLogo, crearLogo, listarLogos } from "../controllers/Logos.js"
import upload from "../multer/multer.js"
import { validationToken, verificarRol } from "../controllers/Authentication.js"

const logosRouter = Router()

logosRouter.post('/logopost',validationToken, verificarRol([1]), upload.single('logo'), crearLogo)
logosRouter.put('/logoput/:idlogos',validationToken, verificarRol([1]),  upload.single('logo'), actualizarLogo) 
logosRouter.put('/logosputs/:idlogos', validationToken, verificarRol([1]),cambiarEstadoLogo)
logosRouter.get('/logoget',validationToken, verificarRol([1]), listarLogos)

export default logosRouter