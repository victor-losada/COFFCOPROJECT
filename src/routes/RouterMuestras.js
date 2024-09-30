import { Router } from "express";
import { sampleGet, sampleIdGet, sampleRegister, sampleUpdate } from "../controllers/Muestras.js";



const sampleRouter = Router()

sampleRouter.post("/samplepost", sampleRegister)
sampleRouter.get("/sampleget", sampleGet)
sampleRouter.get("/samplegetid/:idmuestra", sampleIdGet)
sampleRouter.put("/sampleupdate", sampleUpdate)

export default sampleRouter