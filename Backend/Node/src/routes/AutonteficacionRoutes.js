import { Router } from "express";
import { validarUsuarios } from "../controllers/AutentificacionLogin.js";

const RutaAuth = Router()

RutaAuth.post('/login', validarUsuarios)


export default RutaAuth