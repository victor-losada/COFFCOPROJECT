import { Router } from "express";
import { serviciosPorMuestra } from "../controllers/Facturas.js";


const facturaRouter = Router()

facturaRouter.get('/facturasget/:idmuestra', serviciosPorMuestra)

export default facturaRouter