import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, registrarUsuario } from "../controllers/usuarioController.js";
import { validateUser } from "../validation/UsuariosValidator.js";
import { validarToken, validarUsuarios } from "../controllers/AutentificacionLogin.js";
const rutaUsuario= Router()

rutaUsuario.get('/listar', validarToken,listarUsuario)
rutaUsuario.get('/listarid/:id_usuario',validarToken, listarUsuarioId)
rutaUsuario.post('/registrar', validateUser,registrarUsuario)
rutaUsuario.delete('/eliminar/:id_usuario', validarToken, eliminarUsuario)
rutaUsuario.put('/actualizar/:id_usuario',validarToken, validateUser,actualizarUsuario)


export default rutaUsuario  