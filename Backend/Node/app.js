import express from "express"; 
import bodyParser from "body-parser";
import rutaMunicipio from "./src/routes/municipioRoute.js";
import ruta from "./src/routes/muestraRoutes.js";
import DocumentosController from "./src/routes/DocumentosRoute.js";
import rutaVersion from "./src/routes/VersionesRoute.js";
import rutaUsuario from './src/routes/usuarioRoute.js';
import rutaDetalle from "./src/routes/detalleRoute.js";
import rutaFinca from "./src/routes/FincaRoute.js";
import rutaDatos from "./src/routes/DatosRouters.js";
import autenticacionRoute from "./src/routes/UsuarioAutenticationRoute.js";
import cors from "cors"; 

const servidor = express(); 
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: true }));
servidor.set('view engine', 'ejs');
servidor.set('views', './views');
servidor.use(express.static('./public')); 

servidor.use(cors());

servidor.use('/documents', (req, res) => {
    res.render('documentacion.ejs');
});

servidor.use("/municipio", rutaMunicipio);
servidor.use("/muestra", ruta);
servidor.use("/documentos", DocumentosController);
servidor.use("/versiones", rutaVersion);
servidor.use('/usuario', rutaUsuario);
servidor.use('/detalle', rutaDetalle);
servidor.use('/finca', rutaFinca);
servidor.use('/datos', rutaDatos);
servidor.use(autenticacionRoute)



servidor.listen(3000, () => {
    console.log("servidor escuchando desde el puerto 3000");
});
