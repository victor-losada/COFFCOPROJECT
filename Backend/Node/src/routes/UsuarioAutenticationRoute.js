import {  Router } from "express";
import { validarUsuarios } from "../controllers/AutentificacionLogin.js";


const autenticacionRoute = Router()


autenticacionRoute.post('/validar', validarUsuarios)

export default autenticacionRoute;