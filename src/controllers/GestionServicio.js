import { conexion } from "../database/conexion.js";

export const serviceRegister = async(req, res) => {

    const { muestra_idmuestra, tiposervicio_idtiposervicio, Fecha, Ambiente_idAmbiente, usuarios_idusuarios } = req.body;

    const  imagen = req.file ? req.file.filename : null

    if(!imagen){
        return res.status(400).json({message: "No se ha subido ninguna imagen"})
    }
    const variables = JSON.parse(req.body.variables); 


    const estado = 'pendiente'

    const connection = await conexion.getConnection();
    await connection.beginTransaction();

    try {
        const [servicioResult] = await connection.query(
            "INSERT INTO servicio (muestra_idmuestra, Ambiente_idAmbiente, tiposervicio_idtiposervicio, Fecha, usuarios_idusuarios,  estado, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [muestra_idmuestra, Ambiente_idAmbiente, tiposervicio_idtiposervicio, Fecha, usuarios_idusuarios,  estado, imagen]
        );
        
        const servicio_id = servicioResult.insertId;

        for (const variable of variables) {
            const { detalle_iddetalle, valor } = variable;
            await connection.query(
                "INSERT INTO valor (valor, servicio_idservicios, detalle_iddetalle) VALUES (?, ?, ?)",
                [valor, servicio_id, detalle_iddetalle]
            );
        }
        // cada objecto que se recorre trae por lo menos dos propiedades que son variables  y valor
        await connection.commit();
        res.status(201).json({ message: "Servicio registrado exitosamente" });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Error al registrar el servicio", error });
    } finally {
        connection.release();
    }
}

export const serviceList = async(req,res) =>{
    try{

        const [respuesta] = await conexion.query("select * from servicio where estado = 'pendiente'")
        res.status(200).json(respuesta)

    }catch(error){
        res.status(500).json({message: "Error al obtener la lista de servicios"})
    }
}



export const serviceUpdate = async (req, res) => {
    const { nuevosDatos, justificacion, idUsuario } = req.body;
    const {idservicios} = req.params 

    const connection = await conexion.getConnection();
    await connection.beginTransaction();

    try {
        await verificarPlazo(idservicios);

        delete nuevosDatos.entrada;
        delete nuevosDatos.salida;

        await connection.query(
            "UPDATE servicios SET ? WHERE idservicios = ?", 
            [nuevosDatos, idservicios]
        );

        await connection.query(
            "INSERT INTO observaciones (justificacion, fecha, id_usuarios, id_servicios) VALUES (?, NOW(), ?, ?)",
            [justificacion, idUsuario, idservicios]
        );

        await connection.commit();
        res.status(200).json({ message: "Servicio actualizado correctamente." });

    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: "Error al actualizar el servicio", error });
    } finally {
        connection.release();
    }
};

export const plazoServicio = async(idservicios) => {

    const [servicio] = await conexion.query(
        "SELECT Fecha FROM servicios WHERE idservicios = ? AND estado = 'completado'", 
        [idservicios]
    );

    if (!servicio || !servicio.length) {
        throw new Error("El servicio no se ha completado o no existe.");
    }

    const fechaCompletado = new Date(servicio[0].Fecha);
    const fechaActual = new Date();
    const diferenciaDias = Math.ceil((fechaActual - fechaCompletado) / (1000 * 60 * 60 * 24));

    if (diferenciaDias > 8) {
        throw new Error("El periodo de actualización ha expirado.");
    }
}

export const obtenerPrecioPorTipoServicio = async (req, res) => {
    const { tiposervicio_idtiposervicio } = req.params;

    try {
        const [precioResult] = await conexion.query(
            "select precio from precio where tiposervicio_idtiposervicio = ? AND estado_precio = 'activo'",
            [tiposervicio_idtiposervicio]
        );

        if (precioResult.length > 0) {
            res.status(200).json({ precio: precioResult[0].precio });
        } else {
            res.status(404).json({ message: "Precio no encontrado para este tipo de servicio" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el precio", error });
    }
};
export const obtenerVariablesPorTipoServicio = async (req, res) => {
    const { tiposervicio_idtiposervicio } = req.params;

    try {
        const [variables] = await conexion.query(
            "SELECT idvariable, nombre FROM variables WHERE tiposervicio_idtiposervicio = ?",
            [tiposervicio_idtiposervicio]
        );
        res.status(200).json({ variables });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las variables", error });
    }
};

export const estadoServicio = async (req, res) => {
    const { estado, cantidad_salida } = req.body;

    const {idservicios} = req.params

    try {
        const [servicio] = await conexion.query(
            "SELECT estado FROM servicio WHERE idservicios = ?",
            [idservicios]
        );

        if (!servicio.length) {
            return res.status(404).json({ message: "Servicio no encontrado." });
        }


        if (estado === 'completado') {
            if (!cantidad_salida) {
                return res.status(400).json({ message: "Debe proporcionar la cantidad de salida para completar el servicio." });
            }

            await conexion.query(
                "UPDATE servicio SET estado = 'completado', cantidad_salida = ? WHERE idservicios = ?",
                [cantidad_salida, idservicios]
            );

            return res.status(200).json({ message: "Servicio completado con éxito y cantidad de salida registrada." });

        } else if (estado === 'en proceso') {
            await conexion.query(
                "UPDATE servicio SET estado = 'en proceso' WHERE idservicios = ?",
                [idservicios]
            );

            return res.status(200).json({ message: "Estado del servicio actualizado '." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor"+ error});
    }
};


