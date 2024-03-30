import { Router } from "express";
import { listarfincas, registrarFincas, eliminarfincas, actualizarFincas } from "../controllers/FincaController.js";
const rutaFinca = Router()

rutaFinca.get('/listar', listarfincas)
rutaFinca.post('/registrar', registrarFincas)
rutaFinca.delete('/eliminar/:id_finca', eliminarfincas)
rutaFinca.put('/actualizar/:id_finca', actualizarFincas)

export default rutaFinca