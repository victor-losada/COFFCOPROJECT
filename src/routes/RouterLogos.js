import { Router } from "express"
import { actualizarLogo, cambiarEstadoLogo, crearLogo, listarLogos } from "../controllers/Logos.js"
import upload from "../multer/multer.js"

const logosRouter = Router()

logosRouter.post('/logopost', upload.single('logo'), crearLogo)
logosRouter.put('/logoput/:idlogos',  upload.single('logo'), actualizarLogo) 
logosRouter.put('/logosputs/:idlogos', cambiarEstadoLogo)
logosRouter.get('/logoget', listarLogos)

export default logosRouter