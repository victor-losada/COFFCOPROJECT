import { Router } from "express";
import { estadoServicio, obtenerPrecioPorTipoServicio, obtenerVariablesPorTipoServicio, serviceList, serviceRegister, serviceUpdate } from "../controllers/GestionServicio.js";
import { reporteServicio } from "../controllers/ReporteServicio.js";
import upload2 from "../multer/image.js";


const servicioRouter = Router()

servicioRouter.post("/servicepost", upload2.single("image"), serviceRegister)

servicioRouter.get("/servicesget", serviceList)
servicioRouter.put("/serviceupdate/:idServicio", serviceUpdate)
servicioRouter.get("/serviceget/:tiposervicio_idtiposervicio", obtenerPrecioPorTipoServicio)
servicioRouter.get("/servicevariables/:tiposervicio_idtiposervicio", obtenerVariablesPorTipoServicio)
servicioRouter.put('/servicestatus/:idservicios', estadoServicio)
servicioRouter.get('/servicioreporte/:idservicios', reporteServicio)

export default servicioRouter