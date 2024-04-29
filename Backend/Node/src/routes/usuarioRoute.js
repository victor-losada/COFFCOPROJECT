import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, registrarUsuario } from "../controllers/usuarioController.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";
const rutaUsuario= Router()

rutaUsuario.get('/listar',validarToken,listarUsuario)
rutaUsuario.get('/listar/:id',validarToken, listarUsuarioId)
rutaUsuario.post('/registrar',validarToken,registrarUsuario)
rutaUsuario.delete('/eliminar/:id', validarToken,eliminarUsuario)
rutaUsuario.put('/actualizar/:id',validarToken,actualizarUsuario)


export default rutaUsuario