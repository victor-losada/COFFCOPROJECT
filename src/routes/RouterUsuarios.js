import { Router } from "express";
import { userDelete, userGet, userIdGet, userRegister, userUpdate } from "../controllers/Usuarios.js";
import { validationToken } from "../controllers/Authentication.js";


const User = Router()

User.post("/createusers",validationToken, userRegister)
User.put("/updateusers/:idusuarios",validationToken, userUpdate)
User.get("/getusers", validationToken, userGet)
User.get("/getusers/:idusuarios",validationToken, userIdGet)
User.delete("/deleteusers/:idusuarios", validationToken, userDelete)
export default User