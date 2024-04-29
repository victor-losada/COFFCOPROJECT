import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, listarUsuarioId, registrarUsuario } from "../controllers/usuarioController.js";

const rutaUsuario= Router()

rutaUsuario.get('/listar',listarUsuario)
rutaUsuario.get('/listar/:id', listarUsuarioId)
rutaUsuario.post('/registrar',registrarUsuario)
rutaUsuario.delete('/eliminar/:id', eliminarUsuario)
rutaUsuario.put('/actualizar/:id',actualizarUsuario)


export default rutaUsuario