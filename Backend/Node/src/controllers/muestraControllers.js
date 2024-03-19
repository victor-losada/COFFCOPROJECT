
import {conexion} from "../database/conexion.js"
export const ListarMuestras =async(req,res)=>{
    try {
    let sql="select * from muestra"
    const [responde] = await conexion.query(sql)
        res.status(200).json(responde)
    } catch (error) {
        res.status(500).json({"menssage":"error en la conexion"+error})
    }
}
export const RegistrarMuestra=async(req,res)=>{
    try {
        let {cantidad,fk_id_finca}=req.body
        let sql =`insert into muestra(cantidad,fk_id_finca)
        values('${cantidad}','${fk_id_finca}')`
        const [respuesta]=await conexion.query(sql)
        if(respuesta.affectedRows>0){
            return res.status(200).json({"menssage":"se registro correctamente el usuario"})

        }
        else{
            return res.status(404).json({"message":"no se registro el usuario"})

        }
    } catch (error) {
        return res.status(404).json({"message":"error al conectar la base de datos "})
    }
}
export const ActualizarMuestra=async(req,res)=>{
    let {id_muestra,cantidad,fk_id_finca}=req.body
    let id=req.params.id
    let sql=`update muestra set id_muestra='${id_muestra}', cantidad='${cantidad}',fk_id_finca='${fk_id_finca}' where id_muestra=${id}`
    const [responde]=await conexion.query(sql)
    if(responde.affectedRows>0){
        return res.status(200).json({"message":"se actualizo con exito el usuario"})
    }
    else{
        return res.status(404).json({"message":"no se actualizo el usuario"})
    }
    
}
export const EliminarMuestra= async(req,res)=>{
    try {
        let id=req.params.id
        let sql =`delete from muestra where id_muestra=${id}`
        const [responde]=await conexion.query(sql)
        if(responde.affectedRows>0){
            res.status(200).json({"message":"usuairo eliminado correctamente "})
        }
        else{
            res.status(404).json({"message":"usuario no eliminado correctamente"})
        }  
    } catch (error) {
        res.status(500).json({"message":"error en la conexion"+error.menssage})
    }
}
export const ListaridMuestra=async(req,res)=>{
try {
    let id=req.params.id
    let sql=`select * from muestra where id_muestra=${id}`
    const [responde]= await conexion.query(sql)
    if(responde.length == 1){
        res.status(200).json(responde)
    }
    else{
        res.status(500).json({"message":"usuario no encontrado"})
    }
    
} catch (error) {
    res.status(500).json({"menssage":"error en la conexion en la base de datos "+error.menssage})
}
}