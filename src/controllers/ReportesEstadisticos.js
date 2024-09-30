import { conexion } from "../database/conexion.js"

// calcula el promdeio de los valores de las variables asociadas a cada tipo de servicio
export const promedioVariables = async(req,res) => {
    try{
        const [result] = await conexion.query(`
            SELECT ts.nombreServicio, v.nombre AS variable, AVG(CAST(val.valor AS DECIMAL(10, 2))) AS promedio
            FROM servicio s
            JOIN valor val ON s.idservicios = val.servicio_idservicios
            JOIN detalle d ON val.detalle_iddetalle = d.iddetalle
            JOIN variables v ON d.variables_idvariable = v.idvariable
            JOIN tiposervicio ts ON s.tiposervicio_idtiposervicio = ts.idtiposervicio
            GROUP BY ts.nombreServicio, v.nombre
        `)
        res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: "error al obtner promedio"})
    }
}
// cantidad de servicios realizados, por tipo de servicio
export const serviciosPorTipo = async (req, res) => {
    const { fechaInicio, fechaFin } = req.body 

    try {
        const [result] = await conexion.query(`
            SELECT ts.nombreServicio, COUNT(s.idservicios) AS Cantidad_Servicios
            FROM servicio s
            JOIN tiposervicio ts ON s.tiposervicio_idtiposervicio = ts.idtiposervicio
            WHERE s.Fecha BETWEEN ? AND ?
            GROUP BY ts.nombreServicio
        `, [fechaInicio, fechaFin])

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la cantidad de servicios por tipo" })
    }
}

// servicios hecho por el operario
export const serviciosPorOperario = async (req, res) => {
    try {
        const [result] = await conexion.query(`
            select u.nombre as Operario, COUNT(s.idservicios) AS Cantidad_Servicios
            FROM servicio s
            JOIN usuarios u ON s.usuarios_idusuarios = u.idusuarios
            GROUP BY u.nombre
        `)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor al obtener servicios" })
    }
}
// listado de servicios junto con los valores específicos de las variables asociadas a cada uno

export const serviciosConVariables = async(req,res) => {
    try{

        const [result] = await conexion.query(`
            select s.idservicios, ts.nombreServicio, v.nombre as variable, val.valor
            from servicio s
            join valor on idservicios = val.servicio_idservicios
            join detalle on detalle_iddetalle = iddetalle
            join variables on variables_idvariable = idvariable
            join tiposervicio on tiposervicio_idtiposervicio = idtiposervicio
            `)
            res.status(200).json(result)
    }catch(error){
        res.status(500).json({message: "Error al obtener servicios con variables"})
    }
}
// obtener los servicios completados, pendientes o incompletos

export const serviciosPorEstado = async (req, res) => {

    try {
        const [result] = await conexion.query(`
            select s.estado, count(s.idservicios) AS Cantidad_Servicios
            FROM servicio s
            GROUP BY s.estado
        `)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la cantidad de servicios por estado", error })
    }
}

// cuantas servicios se realizan por ambiente

export const serviciosXambiente = async (req, res) => {
    try {
        const [result] = await conexion.query(`
            SELECT a.Nombre_ambiente, COUNT(s.idservicios) AS Cantidad_Servicios
            FROM servicio s
            JOIN Ambiente a ON s.Ambiente_idAmbiente = a.idAmbiente
            GROUP BY a.Nombre_ambiente
        `)

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la distribución de servicios por ambiente", error })
    }
}

// cuantas muestran se le ha hecho a una finca y a que municipio pertenece esa finca

export const muestrasXFinca = async (req, res) => {
    try {
        const [result] = await conexion.query(`
            SELECT m.nombre_municipio, f.nombre_finca, COUNT(mu.idmuestra) AS Cantidad_Muestras
            FROM muestra mu
            JOIN finca f ON mu.finca_idfinca = f.idfinca
            JOIN municipio m ON f.municipio_idmunicipio = m.idmunicipio
            GROUP BY m.nombre_municipio, f.nombre_finca;
        `);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la cantidad de muestras por municipio y finca", error });
    }
};

// servicios hechos por fecha

