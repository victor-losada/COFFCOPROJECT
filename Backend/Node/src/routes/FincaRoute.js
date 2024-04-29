import { Router } from "express";
import { listarfincas, registrarFincas, eliminarfincas, actualizarFincas, ListaridFincas } from "../controllers/FincaController.js";
const rutaFinca = Router()

rutaFinca.get('/listar', listarfincas)
rutaFinca.post('/registrar', registrarFincas)
rutaFinca.delete('/eliminar/:id_finca', eliminarfincas)
rutaFinca.put('/actualizar/:id_finca', actualizarFincas)
rutaFinca.get('/listarid/:id_finca', ListaridFincas)

export default rutaFinca