import { Router } from "express";
import { serviciosPorMuestra } from "../controllers/Facturas.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const facturaRouter = Router()

facturaRouter.get('/facturasget/:idmuestra',validationToken, verificarRol([1]), serviciosPorMuestra)

export default facturaRouter