import { conexion } from "../database/conexion.js";

export const priceRegister = async(req, res) => {

    const { presentacion, precio, tiposervicio_idtiposervicio}  = req.body

    const estado_precio = 'activo'


    
    try{

        if(tiposervicio_idtiposervicio === 'alquiler de laboratorio'){
            await conexion.query("insert into precio (estado_precio, precio, tiposervicio_tiposervicio) values (?, ?, ?)",[
                estado_precio, precio, tiposervicio_idtiposervicio
            ])
        }
        else {
        await conexion.query("insert into precio (estado_precio, presentacion, precio, tiposervicio_idtiposervicio) values (?, ?, ?, ?) ",[estado_precio, presentacion, precio, tiposervicio_idtiposervicio])

    }

        res.status(200).json({message: "Precio agregado exitosamente"})

    }catch(error){  
        res.status(500).json({message: "error en el servidor"})
    }
}

export const priceUpdate = async(req,res) => {

    const { presentacion, precio, tiposervicio_idtiposervicio}  = req.body

    const {idprecio} = req.params

    try{

        await conexion.query("update precio set presentacion = ?, precio = ?, tiposervicio_idtiposervicio = ? where idprecio = ?",[
            presentacion, precio, tiposervicio_idtiposervicio, idprecio
        ])
        res.status(200).json({message: "precio actualizado correctamente"})

    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const priceStatus = async(req,res) =>{

    const {idprecio} = req.params

    try{
        await conexion.query("update precio set estado_precio = 'inactivo' where idprecio = ? ",[
            idprecio
        ])
        res.status(200).json({message: "precio a estado inactivo"})
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const priceDelete = async(req,res) => {

    const {idprecio} = req.params

    try{    

        await conexion.query("delete from precio where idprecio = ?",[
            idprecio
        ])
        res.status(200).json({message:"precio eliminado con exito"})

    }catch(error){  
        res.status(500).json({message: "error en el servidor"})

    }
}

export const priceGet = async(req,res) => {
    try{
        const [respuesta] = await conexion.query("select * from precio")
        res.status(200).json(respuesta)
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}