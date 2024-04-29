import { conexion } from "../database/conexion.js";
export const alquileres = async (req, res,) => {
    try {
        let sql = "select * from alquiler"
        const [responde] = await conexion.query(sql)
        if (responde.length > 0) {
            res.status(200).json(responde)
        } else {
            res.status(404).json({ 'message': 'No hay datos registrados' })
        }
    }catch(error) {
        res.status(500).json({ 'message':'Error: ' + error.message })
}
}



export const alquilarLaboratorio = async(req,res)=>{
    try {
        let {nombre,apellidos,correo_electronico,telefono,fecha} = req.body
        let sql=  `insert into alquiler (nombre,apellidos,correo_electronico,telefono,fecha) 
        values ('${nombre}','${apellidos}','${correo_electronico}','${telefono}','${fecha}')`
        const [respuesta]=await conexion.query(sql) 
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"se realizo el alquiler con exito"})
        }else{
            return res.status(404).json({"mensagge":"no se realizo el alquiler"})
        }
    }catch(error){
        res.status(500).json({"message":"error en la conexion"+error.menssage})
    }
}
