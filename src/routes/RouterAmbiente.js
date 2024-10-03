import { Router } from "express";
import { ambienceDelete, ambienceGet, ambienceRegister, ambienceUpdate } from "../controllers/Ambientes.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";



const ambienceRouter = Router()

ambienceRouter.post('/ambiencepost',validationToken, verificarRol([1]), ambienceRegister)
ambienceRouter.put('/ambienceput/:idAmbiente',validationToken, verificarRol([1]), ambienceUpdate)
ambienceRouter.delete('/ambiencedelete/:idAmbiente',validationToken, verificarRol([1]), ambienceDelete)
ambienceRouter.get('/ambienceget',validationToken, verificarRol([1]), ambienceGet)

export default ambienceRouter