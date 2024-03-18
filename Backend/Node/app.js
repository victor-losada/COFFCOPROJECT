import express from 'express'
import bodyParser from 'body-parser'
import ArchivosRoute from "./src/routes/ArchivosRoute.js"
import FormatoRoute from './src/routes/FormatoRoute.js'


const servidor = express()
servidor.use(bodyParser.json())
servidor.use(bodyParser.urlencoded({extended: false}))

servidor.use("/archivo", ArchivosRoute)
servidor.use("/formato", FormatoRoute)

servidor.listen(3000, () => {
    console.log('listening on port 3000')
})