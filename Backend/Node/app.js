import express from 'express'
import bodyParser from 'body-parser'
import ArchivosRoute from "./src/routes/ArchivosRoute.js"
import FormatoRoute from './src/routes/FormatoRoute.js'


import  Express  from "express";
import bodyParser from "body-parser";
import rutaMunicipio from "./src/routes/municipioRoute.js";
import ruta from "./src/routes/muestraRoutes.js";

const servidor = Express()
servidor.use(bodyParser.json())
servidor.use(bodyParser.urlencoded({extended:true}))

servidor.use("/municipio",rutaMunicipio)
servidor.use("/muestra", ruta )


servidor.listen(3000,()=>{
console.log("servidor escuchando desde el puerto 3000")
})