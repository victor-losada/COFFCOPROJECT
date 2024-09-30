import { conexion } from "../database/conexion.js";


export const tiposdocuRegister = async(req,res) => {

    const {nombreDocumento} = req.body
    const estado = 'activo'

    try{

    await conexion.query("insert into tipodocumento (nombreDocumento, estado) values (?, ?)",[
        nombreDocumento,estado
    ])
    res.status(200).json({message: "tipo de documento agregado correctamente"})
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const tiposdocuGet = async(req,res)=> {
    try{
        const [respuesta] = await conexion.query("select * from tipodocumento")
        res.status(200).json(respuesta)
    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const tipodocuUpdate = async(req,res) => {

    const {idtipoDocumento} = req.params
    const {nombreDocumento} = req.body
    const estado = 'activo'

    try{

        await conexion.query("update tipodocumento set nombreDocumento = ?, estado = ? where idtipoDocumento = ?",[
            nombreDocumento,estado,idtipoDocumento
        ])

        res.status(200).json({message: "tipo de documento actualizado correctamente"})

    }catch(error){
        res.status(500).json({message: "error en el servidor"})
    }
}

export const tipodocStatus = async(req,res) => {

    const {idtipoDocumento} = req.params

    try{
        await conexion.query("update tipodocumento set estado = 'inactivo' where  idtipoDocumento = ?",[
             idtipoDocumento
        ])
        res.status(200).json({message: "tipo de documento inactivo "})
    }catch(error){
        res.status(500).json({message: "error en el servidor"} + error)
    }   
}