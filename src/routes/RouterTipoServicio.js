import { Router } from "express";
import { servicesDelete, servicesGet, servicesRegister, servicesUpdate } from "../controllers/TiposServicios.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const tiposervicioRouter = Router()

tiposervicioRouter.post("/serviciopost",validationToken, verificarRol([1]),servicesRegister)
tiposervicioRouter.get("/servicioget",validationToken, verificarRol([1]), servicesGet)
tiposervicioRouter.put("/servicioupdate",validationToken, verificarRol([1]), servicesUpdate)
tiposervicioRouter.delete("/serviciodelete",validationToken, verificarRol([1]), servicesDelete)

export default tiposervicioRouter