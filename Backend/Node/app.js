import  Express  from "express";
import bodyParser from "body-parser";
import  rutaMunicipio from "./src/routes/municipioRoute.js";

const servidor = Express()
servidor.use(bodyParser.json())
servidor.use(bodyParser.urlencoded({extended:true}))

servidor.use("/municipio",rutaMunicipio)


servidor.listen(3000,()=>{
console.log("servidor escuchando desde el puerto 3000")
})