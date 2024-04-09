import { Estadistica } from "../controllers/EstadisticaControllers.js";
import Router  from "express";
const EstadisticaRouter=Router()

EstadisticaRouter.get('/estadistica', Estadistica)
export default EstadisticaRouter