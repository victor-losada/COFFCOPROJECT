import { conexion } from "../database/conexion.js"

export const listarFormatos = async (req, res) => {
    try{
        let sql = 'select * from formato'
        const [result] = await conexion.query(sql)
        console.log(result.length)
        if(result.length > 0){res.status(200).json(result)}
        else res.status(404).json({"message" : "No se encontraron formatos en la base de datos"})
    }
    catch(err){
        res.status(500).json({"message" : "Error en el controlador FormatoController.js " + err})
    }
}

export const registrarFormatos = async (req, res) => {
    try {
        let {version, editable, fk_id_tipo_formato, fk_id_usuarios} = req.body

        let sql = `insert into archivos (version, editable, fk_id_tipo_formato, fk_id_usuarios)
        values ('${version}','${editable}','${fk_id_tipo_formato}','${fk_id_usuarios}')`
        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se registró con éxito el formato"})
        } 
        else {
            return res.status(404).json({"message":"No se registró ningun formato."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const eliminarFormatos = async (req, res) => {
    try {
        let id_formato = req.params.id_formato

        let sql = `delete from formato where id_formato = ${id_formato}`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se eliminó con éxito el formato."})
        }
        else {
            return res.status(404).json({"message":"No se eliminó el formato."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const actualizarFormatos = async (req, res) => {
    try {
        let {version, editable, fk_id_tipo_formato, fk_id_usuarios} = req.body
        let id_formato = req.params.id_formato
        let sql = `update formato set version = '${version}', editable = '${editable}', fk_id_tipo_formato = '${fk_id_tipo_formato}', 
        fk_id_usuarios = '${fk_id_usuarios}' where id_formato = ${id_formato}`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se actualizó con éxito el formato."})
        }
        else {
            return res.status(404).json({"message":"No se actualizó el formato."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}