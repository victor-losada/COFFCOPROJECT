import { Router } from "express";
import { servicesDelete, servicesGet, servicesRegister, servicesUpdate } from "../controllers/TiposServicios.js";


const tiposervicioRouter = Router()

tiposervicioRouter.post("/serviciopost",servicesRegister)
tiposervicioRouter.get("/servicioget", servicesGet)
tiposervicioRouter.put("/servicioupdate", servicesUpdate)
tiposervicioRouter.delete("/serviciodelete", servicesDelete)

export default tiposervicioRouter