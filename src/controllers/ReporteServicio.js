import { conexion } from "../database/conexion.js"
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import PDFDocument from 'pdfkit'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const reporteServicio = async (req, res) => {
    const { idservicios } = req.params;

    try {
        console.log(`Iniciando generación de reporte para el servicio con id: ${idservicios}`);

        // Consulta para obtener los detalles del servicio
        const [servicio] = await conexion.query(
           `SELECT s.idservicios, ts.nombreServicio, s.Fecha, s.cantidad_salida, s.imagen, u.nombre AS usuario, a.Nombre_ambiente, m.cantidad_entrada, val.valor, var.nombre AS variable
            FROM servicio s
            JOIN tiposervicio ts ON s.tiposervicio_idtiposervicio = ts.idtiposervicio
            JOIN usuarios u ON s.usuarios_idusuarios = u.idusuarios
            JOIN Ambiente a ON s.Ambiente_idAmbiente = a.idAmbiente
            JOIN muestra m ON s.muestra_idmuestra = m.idmuestra
            JOIN valor val ON val.servicio_idservicios = s.idservicios
            JOIN detalle det ON val.detalle_iddetalle = det.iddetalle
            JOIN variables var ON det.variables_idvariable = var.idvariable
            WHERE s.idservicios = ?`,
            [idservicios]
        );

        console.log(`Datos del servicio obtenidos: ${JSON.stringify(servicio)}`);

        if (!servicio.length) {
            throw new Error("No se encontraron servicios o variables asociadas");
        }

        const doc = new PDFDocument();
        const filePath = `public/reportesServicios/reporte-servicio-${idservicios}.pdf`;
        doc.pipe(fs.createWriteStream(filePath));

        doc.fontSize(20).text(`Reporte del Servicio para la Muestra`, { align: 'center' });
        doc.moveDown();

        const { nombreServicio, Fecha, cantidad_entrada, cantidad_salida, imagen, usuario, Nombre_ambiente } = servicio[0];
        doc.fontSize(12).text(`Servicio: ${nombreServicio}`);
        doc.text(`Fecha: ${new Date(Fecha).toLocaleDateString()}`);
        doc.text(`Cantidad de entrada: ${cantidad_entrada} kg`);

        doc.text(`Cantidad de salida: ${cantidad_salida} kg`);
        doc.text(`Usuario que realizó el servicio: ${usuario}`);
        doc.text(`Ambiente: ${Nombre_ambiente}`);
        doc.moveDown();

        doc.fontSize(14).text(`Variables Asociadas:`)
        servicio.forEach(s => {
            doc.fontSize(12).text(`Variable: ${s.variable} - Valor: ${s.valor}`)
        })
        doc.fontSize(14).text(`IMAGEN CANTIDAD ENTRADA:`)

        if (imagen) {
            const imagePath = path.join(process.cwd(), 'public', 'img', imagen)            
            if (fs.existsSync(imagePath)) {
                console.log(`Imagen encontrada en: ${imagePath}`)
                doc.addPage().image(imagePath, {
                    fit: [500, 400],
                    align: 'center',
                    valign: 'center'
                })
            } else {
                console.log(`Imagen no encontrada en: ${imagePath}`)
            }
        }
        doc.end()

        console.log(`Reporte generado con éxito en: ${filePath}`)

        res.status(200).json({ message: "Reporte generado con éxito", filePath })

    } catch (error) {
        console.error(`Error al generar el reporte: ${error}`)
        res.status(500).json({ message: "Error en el servidor: " + error })
    }
}