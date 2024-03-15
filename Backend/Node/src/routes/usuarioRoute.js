import { Router } from "express";
import { actualizarUsuario, eliminarUsuario, listarUsuario, registrarUsuario } from "../controllers/usuarioController.js";

const rutaUsuario= Router()

rutaUsuario.get('/listar',listarUsuario)
rutaUsuario.post('/registrar',registrarUsuario)
rutaUsuario.delete('/eliminar/:id', eliminarUsuario)
rutaUsuario.put('/actualizar/:id',actualizarUsuario)


export default rutaUsuario