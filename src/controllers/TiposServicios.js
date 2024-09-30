import { conexion } from "../database/conexion.js";

export const servicesRegister = async(req,res) =>{

    const {nombreServicio} = req.body

    try{

        await conexion.query("insert into tiposervicio (nombreServicio) values (?)",[
            nombreServicio
        ])
        res.status(200).json({message: "servicio registrado correctamente"})

    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const servicesGet = async(req,res) => {
    try{
        const [respuesta] = await conexion.query("select * from tiposervicio")
        res.status(200).json(respuesta)
    }catch(error) {
        res.status(500).json({message: "error en el servidor"})
    }
}

export const servicesUpdate = async(req,res) => {

    const {idtiposervicio} = req.params
    const {nombreServicio} = req.body

    try{
        await conexion.query("update tiposervicio set nombreServicio = ? where idtiposervicio",[
            idtiposervicio, nombreServicio
        ])

    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const servicesDelete = async(req,res) => {

    const {idtiposervicio} = req.params

    try{
        await conexion.query("delete from tiposervicio where idtiposervicio = ?",[
            idtiposervicio
        ])
    }catch(error){

    }
}