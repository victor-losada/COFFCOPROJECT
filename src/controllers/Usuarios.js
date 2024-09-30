import { validationResult } from "express-validator";
import bcryptjs from 'bcryptjs';
import { conexion } from "../database/conexion.js";

export  const userRegister = async(req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        const {nombre,apellidos,correo_electronico, contraseña,tipo_documento, numero_documento, estado,rol_idcargos} = req.body

        const estadoUsuario = estado || 'activo'

        const salt = await bcryptjs.genSalt(10);
        const hasPassword = await bcryptjs.hash(contraseña, salt)

        await conexion.query("insert into usuarios (nombre,apellidos,correo_electronico,contraseña,tipo_documento, numero_documento, estado,rol_idcargos) values (?,?,?,?,?,?,?,?)",
            [nombre,apellidos,correo_electronico,hasPassword,tipo_documento, numero_documento, estadoUsuario,rol_idcargos]
        )
        res.status(200).json({message: "usuario creado con exito"})


    }catch(error){
        res.status(500).json({message: "error en el servidor" + error})
    }
}

export const userUpdate = async(req, res) => {

    const {idusuarios} = req.params
        const {nombre,apellidos,correo_electronico, contraseña,tipo_documento, numero_documento, estado,rol_idcargos} = req.body
    try{
        
        const [result] = await conexion.query("update usuarios set nombre = ?, apellidos = ?, correo_electronico = ?, contraseña = ?, tipo_documento = ?, numero_documento = ?,  estado = ?, rol_idcargos = ? where idusuarios = ?",
            [nombre, apellidos, correo_electronico, contraseña, tipo_documento, numero_documento, estado, rol_idcargos, idusuarios]
        )
        if (result.affectedRows === 0){
            return res.status(404).json({message: "usuario no encontrado"})
        }
        res.status(200).json({message: "usuario actualizado con exito"})

    }
    catch(error){
        res.status(500).json({message: "error en el servidor "})
    }
}

export const userGet = async(req,res) => {
    try{
        const sql = "select * from usuarios"
        const [users] = await conexion.query(sql)
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}
  
export const userIdGet = async(req,res)=> {
    const {idusuarios} = req.params
    try{
        const [rows] = await conexion.query("select * from usuarios where idusuarios = ?", [idusuarios])
        if(rows.length <= 0){
            res.status(404).json({message: "Usuarios no encontrado"})
        }
        res.status(200).json(rows[0])
    }
    catch(error){

    }
}
export const userDelete = async(req,res)=>{
    const {idusuarios} = req.params
    try{
        const [result] = await conexion.query("delete from usuarios where idusuarios = ?",[idusuarios])
        if(result.affectedRows === 0){
            return res.status(404).json({message: "Error al eliminar el usuario"})
        }
        res.status(200).json({message: "usuario eliminado con exito"})
    }
    catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}