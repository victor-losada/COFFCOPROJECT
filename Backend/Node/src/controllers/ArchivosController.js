import { conexion } from "../database/conexion.js"

export const listarArchivos = async (req, res) => {
    try{
        let sql = 'select * from archivos'
        const [result] = await conexion.query(sql)
        console.log(result.length)
        if(result.length > 0){res.status(200).json(result)}
        else res.status(404).json({"message" : "No se encontraron archivos en la base de datos"})
    }
    catch(err){
        res.status(500).json({"message" : "Error en el controlador ArchivoController.js " + err})
    }
}

export const registrarArchivos = async (req, res) => {
    try {
        let {nombre, fecha_carga, estado, fk_id_usuarios, fk_id_formatos, descripcion,formato} = req.body

        let sql = `insert into archivos (nombre, fecha_carga, estado, fk_id_usuarios, fk_id_formatos, descripcion,formato)
        values ('${nombre}','${fecha_carga}','${estado}','${fk_id_usuarios}','${fk_id_formatos}','${descripcion}','${formato}')`
        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se registró con éxito el archivo"})
        } 
        else {
            return res.status(404).json({"message":"No se registró el archivo."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const eliminarArchivos = async (req, res) => {
    try {
        let id_documentos = req.params.id_documentos

        let sql = `delete from archivos where id_documentos = ${id_documentos}`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se eliminó con éxito el archivo."})
        }
        else {
            return res.status(404).json({"message":"No se eliminó el archivo."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}

export const actualizarArchivos = async (req, res) => {
    try {
        let {nombre, fecha_carga, estado, fk_id_usuarios, fk_id_formatos, descripcion} = req.body
        let id_documentos = req.params.id_documentos
        let sql = `update archivos set nombre = '${nombre}', fecha_carga = '${fecha_carga}', estado = '${estado}', 
        fk_id_usuarios = '${fk_id_usuarios}', fk_id_formatos = '${fk_id_formatos}', descripcion = '${descripcion}' where id_documentos = ${id_documentos}`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0){
            return res.status(200).json({"message":"Se actualizó con éxito el archivo."})
        }
        else {
            return res.status(404).json({"message":"No se actualizó el archivo."})
        }
    }
    catch(e){
        return res.status(500).json({"message":"error "+e.message})
    }
}