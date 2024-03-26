import { Router } from "express";
import { actualizarDetalle, eliminarDetalle, listarDetalle, listarDetalleId, registrarDetalle } from "../controllers/detalleController.js";

const rutaDetalle = Router()

rutaDetalle.get('/listar', listarDetalle )
rutaDetalle.get('/listar/:id', listarDetalleId  )
rutaDetalle.post('/registrar', registrarDetalle)
rutaDetalle.put('/actualizar/:id', actualizarDetalle)
rutaDetalle.delete('/eliminar/:id', eliminarDetalle)



export default rutaDetalle