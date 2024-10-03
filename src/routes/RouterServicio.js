import { Router } from "express";
import { estadoServicio, obtenerPrecioPorTipoServicio, obtenerVariablesPorTipoServicio, serviceList, serviceRegister, serviceUpdate } from "../controllers/GestionServicio.js";
import { reporteServicio } from "../controllers/ReporteServicio.js";
import upload2 from "../multer/image.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const servicioRouter = Router()

servicioRouter.post("/servicepost",validationToken, verificarRol([1]), upload2.single("image"), serviceRegister)

servicioRouter.get("/servicesget",validationToken, verificarRol([1]), serviceList)
servicioRouter.put("/serviceupdate/:idServicio",validationToken, verificarRol([1]), serviceUpdate)
servicioRouter.get("/serviceget/:tiposervicio_idtiposervicio",validationToken, verificarRol([1]), obtenerPrecioPorTipoServicio)
servicioRouter.get("/servicevariables/:tiposervicio_idtiposervicio",validationToken, verificarRol([1]), obtenerVariablesPorTipoServicio)
servicioRouter.put('/servicestatus/:idservicios',validationToken, verificarRol([1]), estadoServicio)
servicioRouter.get('/servicioreporte/:idservicios',validationToken, verificarRol([1]), reporteServicio)

export default servicioRouter