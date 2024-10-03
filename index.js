 import bodyParser from "body-parser"
 import express from "express";
 import dotenv from 'dotenv';
 import cors from "cors"; 
 import RouterGesDocume from "./src/routes/RouterGesDocumental.js"
 import RouterUser from "./src/routes/RouterUsuarios.js"
 import RouterSample from "./src/routes/RouterMuestras.js"
 import RouterGesService from "./src/routes/RouterServicio.js"
 import RouterPrice from "./src/routes/RouterPrecio.js"
 import RouterAmbience from "./src/routes/RouterAmbiente.js"
 import RouterTipoDocu from "./src/routes/RouterTipoDocument.js"
 import RouterrLogin from "./src/routes/RouterLogin.js"
 import RouterDownload from "./src/routes/RouterDescargaDoc.js"
 import RouterVariables from "./src/routes/RouterVariables.js"
 import RouterValor from "./src/routes/RouterValor.js"
 import Routerlogos from "./src/routes/RouterLogos.js"
 import RouterReportes from "./src/routes/ReportesEstadisticos.js"
 import RouterFacturas from "./src/routes/RouterFacturas.js"
 import RouterContraseña from "./src/routes/RouterContraseña.js"

 const project = express()
 project.use(bodyParser.json())
 project.use(bodyParser.urlencoded({ extended: true }))

 dotenv.config()

 project.use(cors())

 project.use(RouterrLogin)
 project.use('/documental',RouterGesDocume)
 project.use('/user', RouterUser)
 project.use('/sample', RouterSample)
 project.use('/service', RouterGesService)
 project.use('/prices', RouterPrice)
 project.use('/ambience', RouterAmbience)
 project.use('/tipodocument', RouterTipoDocu)
 project.use(RouterDownload)
 project.use('/variables', RouterVariables)
 project.use('/logos', Routerlogos)
 project.use('/valores', RouterValor)
 project.use('/reportes',RouterReportes)
 project.use('/facturas', RouterFacturas)
 project.use('/contrasena',  RouterContraseña)

 const PORT = 3000
 project.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
 })