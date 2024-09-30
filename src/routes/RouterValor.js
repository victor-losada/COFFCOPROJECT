import { Router } from "express";
import { createValor, deleteValor, getValoresPorVariable, updateValor } from "../controllers/Valores.js";


const valorRouter = Router()

valorRouter.post('/valorpost',createValor)
valorRouter.put('/valorput/:idvalor', updateValor)
valorRouter.get('/valorget', getValoresPorVariable)
valorRouter.delete('/valordelete', deleteValor)

export default valorRouter