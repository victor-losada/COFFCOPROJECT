import  Express  from "express";
import bodyParser from "body-parser";
import rutaMunicipio from "./src/routes/municipioRoute.js";
import ruta from "./src/routes/muestraRoutes.js";
import ArchivosRoute from "./src/routes/ArchivosRoute.js"
import FormatoRoute from './src/routes/FormatoRoute.js'
import rutaUsuario from './src/routes/usuarioRoute.js'
import rutaDetalle from "./src/routes/detalleRoute.js";
import cors from "cors"


const servidor = Express()
servidor.use(bodyParser.json())
servidor.use(bodyParser.urlencoded({extended:true}))
servidor.set('view engine','ejs')
servidor.set('views','./views')
servidor.use(Express.static('./public'))
servidor.use(cors())
servidor.use('/documents',(req,res)=>{
    res.render('documentacion.ejs')
})
servidor.use("/municipio",rutaMunicipio)
servidor.use("/muestra", ruta )
servidor.use("/archivo",ArchivosRoute)
servidor.use("/formato",FormatoRoute)
servidor.use('/usuario',rutaUsuario)
servidor.use('/detalle', rutaDetalle)

servidor.listen(3000,()=>{
console.log("servidor escuchando desde el puerto 3000")
})