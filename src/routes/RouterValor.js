import { Router } from "express";
import { createValor, deleteValor, getValoresPorVariable, updateValor } from "../controllers/Valores.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const valorRouter = Router()

valorRouter.post('/valorpost',validationToken, verificarRol([1]),createValor)
valorRouter.put('/valorput/:idvalor',validationToken, verificarRol([1]), updateValor)
valorRouter.get('/valorget',validationToken, verificarRol([1]), getValoresPorVariable)
valorRouter.delete('/valordelete',validationToken, verificarRol([1]), deleteValor)

export default valorRouter