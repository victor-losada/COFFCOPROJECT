import { Router } from "express";
import { listarFormatos, registrarFormatos, eliminarFormatos, actualizarFormatos } from "../controllers/FormatoController.js"
const rutaFormato = Router()

rutaFormato.get('/listar', listarFormatos)
rutaFormato.post('/registrar', registrarFormatos)
rutaFormato.delete('/eliminar/:id', eliminarFormatos)
rutaFormato.put('/actualizar/:id', actualizarFormatos)

export default rutaFormato