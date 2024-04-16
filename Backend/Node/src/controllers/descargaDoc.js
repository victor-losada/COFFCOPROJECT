import { conexion } from "../database/conexion.js";


export const DescargarDocumento = async (req, res) => {
    try {
        const documentoId = req.params.documentoId
        const [documentoRows] = await conexion.query('SELECT * FROM documentos WHERE id = ?', [documentoId])

        if (documentoRows.length > 0) {
            return res.status(200).json({ "message": "La descarga del documento se ha completado correctamente." })
        } else {
            return res.status(404).json({ "message": "No se ha encontrado el documento solicitado." })
        }
    } catch (error) {
        res.status(500).json({"message" : "Error en el controlador ArchivoController.js " + err})

    }
}
