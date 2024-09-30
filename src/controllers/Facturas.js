import { conexion } from "../database/conexion.js"
import PDFDocument from 'pdfkit'
import fs from 'fs'

export const serviciosPorMuestra = async (req, res) => {
    const { idmuestra } = req.params

    try {
        const [servicios] = await conexion.query(
            `SELECT s.idservicios, ts.nombreServicio, s.Fecha, p.precio, m.cantidad_entrada, p.presentacion, m.codigo_muestra
            FROM servicio s
            JOIN tiposervicio ts ON s.tiposervicio_idtiposervicio = ts.idtiposervicio
            JOIN muestra m ON s.muestra_idmuestra = m.idmuestra
            JOIN precio p ON s.tiposervicio_idtiposervicio = p.tiposervicio_idtiposervicio
            WHERE m.idmuestra = ?`, 
            [idmuestra]
        )

        if (servicios.length === 0) {
            return res.status(404).json({ message: "No se encontraron servicios para la muestra especificada" })
        }

        const codigoMuestra = servicios[0].codigo_muestra

        
        const costoTotal = calcularCostoTotal(servicios)

        const doc = new PDFDocument()
        const filePath = `public/facturas/factura-${idmuestra}.pdf`
        doc.pipe(fs.createWriteStream(filePath)) 

        doc.fontSize(20).text(`Factura : ${codigoMuestra}`, { align: 'center' })
        doc.moveDown()

        servicios.forEach(servicio => {
            doc.fontSize(12).text(`Servicio: ${servicio.nombreServicio}`)
            doc.text(`Fecha: ${new Date(servicio.Fecha).toLocaleDateString()}`)
            doc.text(`Cantidad de entrada: ${servicio.cantidad_entrada} kg`)
            doc.text(`Presentación: ${servicio.presentacion}`)
            doc.text(`Precio: $${servicio.precio}`)
            doc.moveDown()
        })

        
        doc.fontSize(16).text(`Costo Total: $${costoTotal}`, { align: 'right' })

        doc.end()

        res.status(200).json({
            message: "Factura generada exitosamente",
            filePath: filePath
        })

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor"+ error })
    }
}
export const calcularCostoTotal = (servicios) => {
    let costoTotal = 0

    servicios.forEach((servicio) => {
        const { cantidad_entrada, precio } = servicio
        const costo = cantidad_entrada * precio 
        costoTotal += costo  // sumar al total
    })

    return costoTotal
}