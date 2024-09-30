import { conexion } from "../database/conexion.js"

export const crearLogo = async (req, res) => {
    const { nombre } = req.body
    const ruta = req.file
    const estado ='activo'
    if (!ruta) {
        return res.status(400).json({ message: "Debes subir un archivo de logo" })
    }

    try {
        await conexion.query("INSERT INTO logos (nombre, ruta, estado) VALUES (?, ?, 'activo')", [nombre, ruta, estado])
        res.status(201).json({ message: "Logo creado exitosamente" })
    } catch (error) {
        res.status(500).json({ message: "error en el servidor" })
    }
}
export const actualizarLogo = async (req, res) => {
    const { idlogos } = req.params
    const { nombre } = req.body
    const ruta = req.file 
    try {
        
        if (ruta) {
            await conexion.query("UPDATE logos SET nombre = ?, ruta = ? WHERE idlogos = ?", [nombre, ruta, idlogos])
        } else {
            await conexion.query("UPDATE logos SET nombre = ? WHERE idlogos = ?", [nombre, idlogos])
        }
        res.status(200).json({ message: "Logo actualizado exitosamente" })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" })
    }
}
export const cambiarEstadoLogo = async (req, res) => {
    const { idlogos } = req.params

    try {
        await conexion.query("UPDATE logos SET estado = 'inactivo' WHERE idlogos = ?", [idlogos])
        res.status(200).json({ message: "Logo desactivado exitosamente" })
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error })
    }
}
export const listarLogos = async (req, res) => {
    try {
        const [logos] = await conexion.query("SELECT * FROM logos WHERE estado = 'activo'")
        res.status(200).json(logos)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" })
    }
}
export const eliminarLogos = async(req,res) => {
    const { idlogos } = req.params
    try{
        await conexion.query("delete from logos where idlogos = ?",
            idlogos
        )
    }catch(error){

    }
}
