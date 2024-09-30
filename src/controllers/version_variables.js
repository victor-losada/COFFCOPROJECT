import { conexion } from "../database/conexion.js"

export const versionVariableRegister = async(req,res) =>{

    const {idversion, idvariable, estado} = req.body

    try{

        await conexion.query("update version_variable set estado = ? where idversion = ? and idvariable = ?",[
             estado, idversion, idvariable
        ])
        res.status(200).json({message: "estado de la variable actualizado correctamente "})

    }catch(error){  
        res.status(500).json({message: "error en el servidor" + error})
    }
}