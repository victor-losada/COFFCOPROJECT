import { conexion } from "../database/conexion.js"

export const createValor = async (req, res) => {
    const { detalle_iddetalle, servicio_idservicios, valor } = req.body

    try {
        await conexion.query(
            "INSERT INTO valor (detalle_iddetalle, servicio_idservicios, valor) VALUES (?, ?, ?)",
            [detalle_iddetalle, servicio_idservicios ? servicio_idservicios : null, valor]
        )
        res.status(201).json({ message: "Valor asignado correctamente." })
    } catch (error) {
        res.status(500).json({ message: "Error al asignar el valor.", error })
    }
}

export const updateValor = async (req, res) => {
    const {  valor } = req.body
    const {idvalor} = req.params
    try {
        await conexion.query(
            "UPDATE valor SET valor = ? WHERE idvalor = ?",
            [valor, idvalor]
        )
        res.status(200).json({ message: "Valor actualizado correctamente." })
    } catch (error) {
        res.status(500).json({ message: "Error en  el servidor." })
    }
}

export const getValoresPorVariable = async (req, res) => {
    const { detalle_iddetalle } = req.params

    try {
        const [result] = await conexion.query(
            "SELECT * FROM valor WHERE detalle_iddetalle = ?",
            [detalle_iddetalle]
        )
        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ message: "No se encontraron valores para esta variable." })
        }
    } catch (error) {
        res.status(500).json({ message: "Error al consultar los valores.", error })
    }
}

export const deleteValor = async (req, res) => {
    const { idvalor } = req.params

    try {
        await conexion.query(
            "DELETE FROM valor WHERE idvalor = ?",
            [idvalor]
        )
        res.status(200).json({ message: "Valor eliminado correctamente." })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el valor.", error })
    }
}
