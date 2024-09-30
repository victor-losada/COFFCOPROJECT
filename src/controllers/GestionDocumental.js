import { conexion } from "../database/conexion.js"

export const manageDocument = async (req, res) => {
    const { documentData, versionData, logoData, variableData } = req.body

    const documentDataParsed = JSON.parse(documentData)
    const versionDataParsed = JSON.parse(versionData)
    const logoDataParsed = JSON.parse(logoData)
    const variableDataParsed = JSON.parse(variableData)

    console.log('documentDataParsed:', documentDataParsed)
    console.log('versionDataParsed:', versionDataParsed)
    console.log('logoDataParsed:', logoDataParsed)
    console.log('variableDataParsed:', variableDataParsed)

    const connection = await conexion.getConnection()
    await connection.beginTransaction()

    try {
        const { fecha_carga, codigo_documentos, descripcion, Fecha_Emision, tipoDocumento_idtipoDocumento } = documentDataParsed
        const nombre = req.file ? req.file.filename : null
        const [documentResult] = await connection.query(
            "INSERT INTO documentos (nombre, fecha_carga, codigo_documentos, descripcion, Fecha_Emision, tipoDocumento_idtipoDocumento) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, fecha_carga, codigo_documentos, descripcion, Fecha_Emision, tipoDocumento_idtipoDocumento]
        )
        const documentos_iddocumentos = documentResult.insertId

        const { version, estado,  fecha_version } = versionDataParsed
        const [versionResult] = await connection.query(
            "INSERT INTO versiones (version, documentos_iddocumentos, estado,  fecha_version) VALUES (?, ?, ?, ?)",
            [version, documentos_iddocumentos, estado,  fecha_version]
        )
        const idversion = versionResult.insertId

        for (const logo of logoDataParsed) {
            const { logos_idlogos } = logo
            await connection.query(
                "INSERT INTO logos_has_documentos (logos_idlogos, documentos_iddocumentos) VALUES (?, ?)",
                [logos_idlogos, documentos_iddocumentos]
            )
        }

        for (const variable of variableDataParsed) {
            const { idvariable, valor } = variable
            const [detalleResult] = await connection.query(
                "INSERT INTO version_variable (idversion, idvariable) VALUES (?, ?)",
                [idversion, idvariable]
            )
            const detalleId = detalleResult.insertId

            await connection.query(
                "INSERT INTO valor (valor, detalle_iddetalle, servicio_idservicios) VALUES (?, ?, ?)",
                [valor, detalleId, variable.servicio_idservicio ? variable.servicio_idservicio : null]
            )
        }

        await connection.commit()
        res.status(201).json({ message: "Documento y sus datos asociados creados exitosamente" })

    } catch (error) {
        await connection.rollback()
        res.status(500).json({ message: "Error al procesar la solicitud", error })
    } finally {
        connection.release()
    }
}

export const manageDocumentUpdate = async(req,res) => {

    const { iddocumentos, nombre, fecha_carga, codigo_documentos, descripcion, Fecha_Emision, tipoDocumento_idtipoDocumento } = req.body

    try {
        await conexion.query(
            "update documentos set nombre = ?, fecha_carga = ?, codigo_documentos = ?, descripcion = ?, Fecha_Emision = ?, tipoDocumento_idtipoDocumento = ? WHERE iddocumentos = ?",
            [nombre, fecha_carga, codigo_documentos, descripcion, Fecha_Emision, tipoDocumento_idtipoDocumento, iddocumentos]
        )
        res.status(200).json({ message: "Documento actualizado exitosamente" })
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el documento", error })
    }
}

export const variableUpdate = async(req, res) => {
    const { idversion, idvariable, nuevo_valor } = req.body 

    try {
        await conexion.query(
            "update valor set valor = ? WHERE servicio_idservicios is null and detalle_iddetalle = (select iddetalle from detalle where versiones_idVersion = ? and variables_idvariable = ?)",
            [nuevo_valor, idversion, idvariable]
        )
        res.status(200).json({ message: "Variable del documento actualizada exitosamente" })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error })
    }
}

export const logosUpdate = async(req,res) =>{
    const { iddocumentos, logos_idlogos } = req.body

    try {
        await conexion.query(
            "update logos_has_documentos set logos_idlogos = ? WHERE documentos_iddocumentos = ?",
            [logos_idlogos, iddocumentos]
        )
        res.status(200).json({ message: "Logo documento actualizado exitosamente" })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" })
    }
}   

export const versionUpdate = async(req,res) =>{

    const { idVersion, version, estado,  fecha_version } = req.body

    try {
        await conexion.query(
            "update versiones set version = ?, estado = ?, = ?, fecha_version = ? WHERE idVersion = ?",
            [version, estado,  fecha_version, idVersion]
        )
        res.status(200).json({ message: "Versión  documento actualizada exitosamente" })
    } catch (error) {
        res.status(500).json({ message: "Error en el  servidor", error })
    }
}

export const statusDocument = async(req,res) => {

    const {iddocumentos} = req.params

    try{
        await conexion.query("update documentos set estado = 'inactivo' where iddocumentos = ? ", [
            iddocumentos
        ] )

        res.status(200).json({message: "documento marcado como inactivo"})
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const asignarVariablesADocumento = async (req, res) => {
    const { idVersion, variables } = req.body

    try {
        for (const variable of variables) {
            const { idvariable } = variable

            await conexion.query(
                "INSERT INTO version_variable (idversion, idvariable) VALUES (?, ?)",
                [idVersion, idvariable]
            )
        }

        res.status(200).json({ message: "Variables asignadas al documento correctamente." })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" })
    }
}

export const obtenerVariablesDeDocumento = async (req, res) => {
    const { idVersion } = req.params

    try {
        const [result] = await conexion.query(
            "SELECT v.nombre AS Variable, vv.idvariable FROM version_variable vv JOIN variables v ON vv.idvariable = v.idvariable WHERE vv.idversion = ?",
            [idVersion]
        )

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener variables del documento", error })
    }
}
export const actualizarVariablesDeDocumento = async (req, res) => {
    const { idVersion, variables } = req.body;

    const connection = await conexion.getConnection();
    await connection.beginTransaction();

    try {
        for (const variable of variables) {
            const { idvariable } = variable;

            // Verificar si la variable ya está asignada a la versión
            const [existe] = await connection.query(
                "SELECT * FROM version_variable WHERE idversion = ? AND idvariable = ?",
                [idVersion, idvariable]
            );

            // Si no existe, insertar la nueva variable
            if (existe.length === 0) {
                await connection.query(
                    "INSERT INTO version_variable (idversion, idvariable) VALUES (?, ?)",
                    [idVersion, idvariable]
                );
            }
        }

        await connection.commit();
        res.status(200).json({ message: "Variables actualizadas correctamente." });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Error al actualizar variables del documento", error });
    } finally {
        connection.release();
    }
};
