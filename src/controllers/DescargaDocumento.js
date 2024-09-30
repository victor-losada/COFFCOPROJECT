import { conexion } from "../database/conexion.js";
import path from "path";
import { promises as fs } from "fs";



export const descargaDocumento = async(req,res) => {

    const {iddocumentos} = req.params

    try{

        const [documento] = await conexion.query("select * from documentos where iddocumentos = ?",[
            iddocumentos
        ])

        if(documento.length === 0){
            res.status(400).json({message: "Documento no encontrado"})
        }

        const rutaDocumento = path.join("public/documents", documento[0].nombre)

        try{
            await fs.access(rutaDocumento)
        }catch(error){
            res.status(400).json({message: "Archivo no encontrado en el servidor" })
        }

        res.download(rutaDocumento)

    }catch(error){
        res.status(500).json({message: "error en el servidor" + error})
    }
}