import { conexion } from "../database/conexion.js"
import { validationResult } from "express-validator"
import jwt from"jsonwebtoken"

export const validarToken=async(req,res,next)=>{
let token_user=req.headers['token']
if(!token_user){
    res.status(402).json({"mensaje":"se requiere un token"})
}
else{
    const decode =jwt.verify(token_user,process.env.SECRET,(Error,decode)=>{
        if(Error){
            res.status(402).json({"mensaje":"token invalido"})
        }
        else {
            next()
        }
    })
}
}





export const validarUsuarios = async (req, res) => {
  try {
    let { numero_identificacion, contraseña_usuario } = req.body;

    let sql =  `SELECT nombre_usuario, rol_usuario FROM usuarios WHERE numero_identificacion = '${numero_identificacion}' AND contraseña_usuario = '${contraseña_usuario}'`;

    const [resultado] = await conexion.query(sql);

    if (resultado.length > 0) {
      // Obtener el rol del usuario del resultado de la consulta
      const { nombre_usuario, rol_usuario } = resultado[0];

      // Crear el token con la información del usuario y su rol
      let token = jwt.sign({ nombre_usuario, rol_usuario }, process.env.SECRET, { expiresIn: process.env.TIME });

      return res.status(200).json({ user: resultado, token, mensaje: "Usuario autorizado" });
    } else {
      res.status(404).json({ mensaje: "Usuario no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor: " + error.message });
  }
};








// export const validarUsuarios = async (req, res) => {

//   try {
  
//     let { numero_identificacion, contraseña_usuario } = req.body

//     let sql =  `select nombre_usuario,rol_usuario from usuarios where numero_identificacion = '${numero_identificacion}' and contraseña_usuario = '${contraseña_usuario}' `

//     const [resultado] = await conexion.query(sql)

//     if (resultado.length > 0) {
//         let token = jwt.sign({user:resultado},process.env.SECRET,{expiresIn:process.env.TIME})
//      return res.status(200).json({user:resultado,token,"mensaje":"usuario autorizado"})
//     }
//     else res.status(404).json({ "menssage": "Usuario no autorizado" })
//   } catch (error) {
//     res.status(500).json("Error en el servidor"+error.message)
//   }
// }