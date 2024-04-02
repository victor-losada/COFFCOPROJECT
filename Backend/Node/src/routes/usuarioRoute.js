import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, registrarUsuario } from "../controllers/usuarioController.js";

const rutaUsuario= Router()

rutaUsuario.get('/listar',listarUsuario)
rutaUsuario.get('/listar/:id', listarUsuarioId)
rutaUsuario.post('/registrar',registrarUsuario)
rutaUsuario.put('/actualizar/:id',actualizarUsuario)
rutaUsuario.delete('/eliminar/:id', eliminarUsuario)


export default rutaUsuario