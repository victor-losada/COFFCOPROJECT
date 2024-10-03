import { conexion } from "../database/conexion.js"

export const variablesSegunVersiones = async (req, res) => {
    const { versionData, idDocumento, idVersionAnterior } = req.body;

    
    const connection = await conexion.getConnection();
    await connection.beginTransaction();

    try {
        const { version, fecha_version } = versionData;
        const estado = 'activo';

        const [versionNueva] = await connection.query(
            "insert into versiones (version, documentos_iddocumentos, estado, fecha_version) values (?, ?, ?, ?)",
            [version, idDocumento, estado, fecha_version]
        );

        const idNuevaVersion = versionNueva.insertId;

      

        const [variables] = await connection.query(
            "insert into version_variable (idversion, idvariable, estado) select ?, idvariable, estado from version_variable where idversion = ?",
            [idNuevaVersion, idVersionAnterior]
        );

        if (!variables.affectedRows) {
            throw new Error("No se encontraron variables para copiar.");
        }

        await connection.commit();
        res.status(200).json({ message: "Nueva versión creada con variables exitosamente." });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    } finally {
        connection.release();
    }
};

export const variablesRegister = async(req,res) => {

    const {nombre, estado, tipoDato} = req.body

    try{

        await conexion.query("insert into variables (nombre, estado, tipoDato) values (?,?,?)",[
            nombre, estado,tipoDato
        ])
        res.status(200).json({message: "variable creada exitosamente"})
    }
    catch(error){
        res.status(500).json({message: "error en el servidor"} + error)
    }   
}   

export const variableGet = async(req,res) => {
    try{
        const [respuesta] = await conexion.query("select * from variables")
        res.status(200).json(respuesta)
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}
export const variablesUpdate = async(req,res) => {

    const { idvariable } = req.params;
    const { nombre, tipoDato, estado } = req.body;

    try{
        await conexion.query("update variables set nombre = ?, tipoDato = ?, estado = ? where idvariable = ?",[
            nombre, tipoDato, estado, idvariable
        ])
        res.status(200).json({message: "variables actualizadas con exito"})
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}
export const variablesDelete = async(req,res) => {

    const {idvariable} = req.params

    try{
        await conexion.query("delete from variables where idvariable = ?",[
            idvariable
        ])
        res.status(200).json({message: "variable eliminada correctamente"})
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }   
}

