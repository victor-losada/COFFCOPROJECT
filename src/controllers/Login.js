import { validationResult } from "express-validator";
import { conexion } from "../database/conexion.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const loginUser = async(req,res) => {

    try{
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }

        const {numero_documento, contraseña} = req.body

        const [respuesta] = await conexion.query(`select idusuarios, nombre, rol_idcargos, contraseña from usuarios where numero_documento = '${numero_documento}' `)

        if(respuesta.length > 0){
            const user = respuesta[0]
            const passwordHash = user.contraseña

            const passwordMatch = await bcryptjs.compare(contraseña,passwordHash)

            if(passwordMatch){
                const token = jwt.sign({idusuarios: user.idusuarios, nombre: user.nombre, rol_idcargos: user.rol_idcargos},process.env.SECRET,{expiresIn: process.env.TIME})
                return res.status(200).json({user: {idusuarios: user.idusuarios, nombre: user.nombre, rol_idcargos: user.rol_idcargos},token, message: 'Usuario ingresado con exito'})
            }
            else{
                return res.status(400).json({message: "Contraseña incorrecta o datos duplicados"})
            }
        }else{
            return res.status(400).json({message: "Usuario no encontrado"})
        }
    }catch(error){
        res.status(500).json({message: "error en el servidor" + error})
    }
}