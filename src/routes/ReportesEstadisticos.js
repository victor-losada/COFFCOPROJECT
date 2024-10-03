import { Router } from "express";
import { muestrasXFinca, promedioVariables, serviciosConVariables, serviciosPorEstado, serviciosPorOperario, serviciosPorTipo } from "../controllers/ReportesEstadisticos.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const reportsRouter = Router()

reportsRouter.get('/variablespromedio',validationToken, verificarRol([1]), promedioVariables)
reportsRouter.post('/serviciosxtipo',validationToken, verificarRol([1]), serviciosPorTipo)
reportsRouter.get('/serviciosxoperario',validationToken, verificarRol([1]), serviciosPorOperario)
reportsRouter.get('/variablesservicios',validationToken, verificarRol([1]), serviciosConVariables)
reportsRouter.post('/serviciosestado',validationToken, verificarRol([1]), serviciosPorEstado)
reportsRouter.get('/muestrasfinca',validationToken, verificarRol([1]), muestrasXFinca)


export default reportsRouter