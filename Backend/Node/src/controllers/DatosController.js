import { conexion } from "../database/conexion.js";
export const ListarDatos = async(req,res) => {
    try {
        
        let sql = "select * from Datos"
        const [responde] = await conexion.query(sql)
            res.status(200).json(responde)
    }
    catch (error) {
        res.status(500).json({"menssage":"error en la conexion"+error})
    }
}
export const RegistrarDatos=async(req,res)=> {
    try {
        let{nombre,tipo,estado,fk_id_formato}=req.body
        let sql = `insert into muestra(nombre,tipo,estado,fk_id_formato)
        values ('${nombre}','${tipo}','${estado},'${fk_id_formato}')`
        const [respuesta] = await conexion.query(sql)
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"se registro correctamente el usuario"})
        }
        else {
            return res.status(404).json({"mensagge":"no se registro el usuario"})
        }
    } catch (error) {
        return res.status(404).json({"menssage":"error al conectar a la base de datos"})
    }
}
export const ActualizarDatos = async(req,res) => {
    let {id_datos,nombre,tipo,estado,fk_id_formato}=req.body
    let id =req.params.id
    let sql = `update datos set id_datos = '${id_datos}', nombre='${nombre}', tipo='${tipo}', estado='${estado}', fk_id_formato='${fk_id_formato}' where id_datos=${id}`
    const [responde]=await conexion.query(sql)
    if (responde.affectedRow>0) {
        return res.status(200).json({"message":"se actualizo con exito el usuario"})
    }
    else {
        return res.status(404).json({"message":"no se actualizo el usuario"}
        )
    }

}
export const ELiminarDatos= async(req,res)=>{
    try {
        let id=req.params.id
        let sql = `delete from datos where id_datos=${id}`
        const [responde] = await conexion.query(sql)
        if (responde.affectedRows>0){
            res.status(200).json({"message":"usuario eliminado correctamente"})
        }
        else {
            res.status(404).json({"message":"usuario no eliminado correctamente"})
        }
    } catch (error) {
        res.status(500).json({"message":"error en la conexion"+error.mensage})
    }
}
export const ListarIdDatos=async(req,res)=> {
    try {
        let id=req.params.id
        let sql=`select * from datos where id_datos=${id}`
        const [responde] = await conexion.query(sql)
        if (responde.length == 1){
            res.status(200).json(responde)
        }
        else {
            res.status(500).json({"message":"usuario no encontrado"})

        }
    } catch (error) {
        res.status(500).json({"menssage":"error en la conexion en la base de datos" +error.menssage})
    }
}