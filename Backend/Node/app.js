import  Express  from "express";
import bodyParser from "body-parser";
import  ruta from "./src/routes/muestraRoutes.js";
const servidor = Express()
servidor.use(bodyParser.json())
servidor.use(bodyParser.urlencoded({extended:true}))

servidor.listen(3000,()=>{
console.log("servidor escuchando desde el puerto 3000...")
})
