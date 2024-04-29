import { Router } from "express";
import { alquilarLaboratorio, alquileres } from "../controllers/alquilerController.js";
import { validarCampos } from "../../validation/validarAlquiler.js";

const rutaAlquiler = Router()

rutaAlquiler.post('/reservar/alquiler', validarCampos, alquilarLaboratorio)
rutaAlquiler.get('/reservas',alquileres)

export default rutaAlquiler
