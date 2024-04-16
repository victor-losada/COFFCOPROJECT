import { conexion } from "../database/conexion.js";

export const RegistrarDocs = async(req, res) => {
    try {

        let sql = `insert into (nombre_documento, usuario, fecha, resultado) values ('${nombre_documento}','${usuario}','${fecha}','${resultado}')`
        const [rows] = await conexion.query(sql)

    if(rows.affectedRows > 0 ){
        return res.status(200).json({"message": "La operación se ha completado correctamente."})
    }
    else {
        return res.status(404).json({"message": "Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo."})
    }
    }
    catch(e) {
        return res.status(500).json({"message":"error "+e.message})

    }
    
}

export const ActualizarDocs = async(req, res) => {
    try {
        let {nombre_documento, usuario, fecha, resultado} = req.body
        let id_documentos = req.params.id_documentos
        let sql = `update documentos set nombre_documento = '${nombre_documento}',usuario = '${usuario}', fecha = '${fecha}', resultado = '${resultado} where id_documento = ${id_documentos}'`

        const [rows] = await conexion.query(sql)
        if(rows.affectedRows > 0 ){
            return res.status(200).json({"message": "La operación se ha completado correctamente."})
        }
        else {
            return res.status(404).json({"message": "Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo."})
        }
    }
    catch(e) {
        return res.status(500).json({"message":"error "+e.message})

    }
    
}