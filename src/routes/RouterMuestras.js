import { Router } from "express";
import { sampleGet, sampleIdGet, sampleRegister, sampleUpdate } from "../controllers/Muestras.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";



const sampleRouter = Router()

sampleRouter.post("/samplepost",validationToken, verificarRol([1]), sampleRegister)
sampleRouter.get("/sampleget",validationToken, verificarRol([1]), sampleGet)
sampleRouter.get("/samplegetid/:idmuestra", validationToken, verificarRol([1]), sampleIdGet)
sampleRouter.put("/sampleupdate", validationToken, verificarRol([1]),sampleUpdate)

export default sampleRouter