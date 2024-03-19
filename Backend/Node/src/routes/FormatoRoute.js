import { Router } from "express";
import { listarFormatos, registrarFormatos, eliminarFormatos, actualizarFormatos } from "../controllers/FormatoController.js"
const rutaFormato = Router()

rutaFormato.get('/listar', listarFormatos)
rutaFormato.post('/registrar', registrarFormatos)
rutaFormato.delete('/eliminar/:id_formato', eliminarFormatos)
rutaFormato.put('/actualizar/:id_formato', actualizarFormatos)

export default rutaFormato