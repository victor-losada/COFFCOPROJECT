import { Router } from "express";
import { variableGet, variablesDelete, variablesRegister, variablesSegunVersiones, variablesUpdate } from "../controllers/Variables.js";
import { versionVariableRegister } from "../controllers/version_variables.js";


const variablesRouters = Router()

variablesRouters.post('/segunversiones', variablesSegunVersiones)
variablesRouters.put('/updatevariables', versionVariableRegister)


variablesRouters.post('/variables', variablesRegister)
variablesRouters.get('/variablesget', variableGet)
variablesRouters.put('/variableput', variablesUpdate)
variablesRouters.delete('/variabledelete', variablesDelete)

export default variablesRouters