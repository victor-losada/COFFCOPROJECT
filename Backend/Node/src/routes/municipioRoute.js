import { Router } from "express";
import { ListarMunicipio, RegistrarMunicipio,ActualizarMunicipio,EliminarMunicipio, ListaridMunicipio } from "../controllers/municipoControllers.js";

const rutaMunicipio=Router()

rutaMunicipio.get("/listar",ListarMunicipio)
rutaMunicipio.post("/registrar", RegistrarMunicipio)
rutaMunicipio.put("/actualizar/:id",ActualizarMunicipio)
rutaMunicipio.delete("/eliminar/:id",EliminarMunicipio)
rutaMunicipio.get("/listarid/:id",ListaridMunicipio)


export default rutaMunicipio