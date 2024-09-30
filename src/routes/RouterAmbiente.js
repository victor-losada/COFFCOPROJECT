import { Router } from "express";
import { ambienceDelete, ambienceGet, ambienceRegister, ambienceUpdate } from "../controllers/Ambientes.js";



const ambienceRouter = Router()

ambienceRouter.post('/ambiencepost', ambienceRegister)
ambienceRouter.put('/ambienceput/:idAmbiente', ambienceUpdate)
ambienceRouter.delete('/ambiencedelete/:idAmbiente', ambienceDelete)
ambienceRouter.get('/ambienceget', ambienceGet)

export default ambienceRouter