import { Router } from "express";
import { loginUser } from "../controllers/Login.js";


const loginRouter = Router()

loginRouter.post('/login', loginUser)


export default loginRouter