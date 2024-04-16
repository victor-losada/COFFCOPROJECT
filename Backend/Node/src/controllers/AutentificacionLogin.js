import { conexion } from "../database/conexion.js"

export const validarUsuarios = async (req, res) => {
  try {
    let { numero_identificacion, contraseña_usuario } = req.body

    let sql = `select nombre_usuario, rol_usuario from usuarios where numero_identificacion = '${numero_identificacion}' and contraseña_usuario = '${contraseña_usuario}'`

    const [resultado] = await conexion.query(sql)

    if (resultado.length > 0) {
      res.status(200).json(resultado)
    }
    else res.status(404).json({ "menssage": "Usuario no autorizado" })
  } catch (error) {
    res.status(500).json("Error en el servidor"+error.message)
  }
}