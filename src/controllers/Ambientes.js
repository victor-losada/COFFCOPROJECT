import { conexion } from "../database/conexion.js";


export const ambienceRegister = async(req, res) => {

    const {Nombre_ambiente, estado} = req.body

    try{

        await conexion.query("insert into ambiente (Nombre_ambiente, estado) values (?, ?)",
            [Nombre_ambiente,estado]
        )
        res.status(200).json({message: `el ambiente ${Nombre_ambiente} registrado correctamente`})

    }catch(error){  
        res.status(500).json({message: "error en el servidor"})
    }
}

export const ambienceUpdate = async(req,res) => {
    const {idAmbiente} = req.params
    try{
        await conexion.query("update ambiente set estado = 'inactivo' where idAmbiente = ? ",[
            idAmbiente
        ])
        res.status(200).json({message: "Ambiente inactivo"})
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const ambienceDelete = async(req,res) => {
    const {idAmbiente} = req.params

    try{
        await conexion.query("delete from ambiente where idAmbiente = ?",[
            idAmbiente
        ])
        res.status(200).json({message: "Ambiente eliminado con exito"})
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const ambienceGet = async(req,res) => {
    try{
        const [respuesta] = await conexion.query("select * from ambiente")
        res.status(200).json(respuesta)
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}