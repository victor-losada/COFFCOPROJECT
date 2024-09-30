import { conexion } from "../database/conexion.js";


export const sampleRegister = async(req,res) => {
    const { cantidad_entrada, finca_idfinca, fecha_muestra, usuarios_idusuarios } = req.body;

    try {
        const [result] = await conexion.query("select count(idmuestra) AS total from muestra");
        const nextId = result[0].total + 1;

        const fecha = new Date().toISOString().split('T')[0].replace(/-/g, ""); 
        const codigo_muestra = `MUESTRA-${fecha}-${nextId}`;

        await conexion.query(
            "insert into muestra (cantidad_entrada, finca_idfinca, fecha_muestra, codigo_muestra, usuarios_idusuarios) VALUES (?, ?, ?, ?, ?)",
            [cantidad_entrada, finca_idfinca, fecha_muestra, codigo_muestra, usuarios_idusuarios]
        );

        res.status(200).json({ message: "Muestra registrada exitosamente", codigo_muestra });
    }

    catch(error){
        res.status(500).json({message: "error en el servidor" + error})
    }
}
export const sampleUpdate = async(req,res) => {
    const {idmuestra} = req.params
    const { cantidad_entrada, finca_idfinca, fecha_muestra, usuarios_idusuarios } = req.body;

    try {

        await conexion.query(
            "update muestra set cantidad_entrada = ?, finca_idfinca = ?, fecha_muestra = ?, usuarios_idusuarios = ? where idmuestra = ?",
            [cantidad_entrada, finca_idfinca, fecha_muestra,  usuarios_idusuarios, idmuestra]
        );

        res.status(200).json({ message: "Muestra actualizada exitosamente" });
    }

    catch(error){
        res.status(500).json({message: "error en el servidor" + error})
    }
}

export const sampleGet = async(req,res) => {
    try{
        const [respuesta] = await conexion.query("select *  from muestra ")

        if(respuesta === 0){
            res.status(404).json({message: "No hay muestras registradas"})
        }
        res.status(200).json(respuesta)
        
    }catch(error){
        res.status(500).json({message: "error en el servidor" + error})
    }
}
export const sampleIdGet = async(req,res) => {

    const {idmuestra} = req.params

    try{
        const [respuesta] = await conexion.query("select *  from muestra where idmuestra = ? ", [idmuestra])

        if(respuesta === 0){
            res.status(404).json({message: "No hay muestras registradas"})
        }
        res.status(200).json(respuesta)
        
    }catch(error){
        res.status(500).json({message: "error en el servidor" + error})
    }
}