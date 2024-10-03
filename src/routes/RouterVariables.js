import { Router } from "express";
import { variableGet, variablesDelete, variablesRegister, variablesSegunVersiones, variablesUpdate } from "../controllers/Variables.js";
import { versionVariableRegister } from "../controllers/version_variables.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const variablesRouters = Router()

variablesRouters.post('/segunversiones',validationToken, verificarRol([1]), variablesSegunVersiones)
variablesRouters.put('/updatevariables',validationToken, verificarRol([1]), versionVariableRegister)


variablesRouters.post('/variables',validationToken, verificarRol([1]), variablesRegister)
variablesRouters.get('/variablesget',validationToken, verificarRol([1]), variableGet)
variablesRouters.put('/variableput',validationToken, verificarRol([1]), variablesUpdate)
variablesRouters.delete('/variabledelete',validationToken, verificarRol([1]), variablesDelete)

export default variablesRouters