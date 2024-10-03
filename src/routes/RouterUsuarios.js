import { Router } from "express";
import { userDelete, userGet, userIdGet, userRegister, userUpdate } from "../controllers/Usuarios.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const User = Router()

User.post("/createusers",validationToken, verificarRol([1]), userRegister)
User.put("/updateusers/:idusuarios",validationToken, verificarRol([1]), userUpdate)
User.get("/getusers",validationToken, verificarRol([1]), userGet)
User.get("/getusers/:idusuarios",validationToken, verificarRol([1]), userIdGet)
User.delete("/deleteusers/:idusuarios",validationToken, verificarRol([1]), userDelete)
export default User