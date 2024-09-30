import { Router } from "express";
import { muestrasXFinca, promedioVariables, serviciosConVariables, serviciosPorEstado, serviciosPorOperario, serviciosPorTipo } from "../controllers/ReportesEstadisticos.js";


const reportsRouter = Router()

reportsRouter.get('/variablespromedio',promedioVariables)
reportsRouter.post('/serviciosxtipo', serviciosPorTipo)
reportsRouter.get('/serviciosxoperario', serviciosPorOperario)
reportsRouter.get('/variablesservicios', serviciosConVariables)
reportsRouter.post('/serviciosestado', serviciosPorEstado)
reportsRouter.get('/muestrasfinca', muestrasXFinca)


export default reportsRouter