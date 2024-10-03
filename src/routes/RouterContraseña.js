import { Router } from "express";
import { IdVerify, passwordForgot, resetPassword, verifyResetToken } from "../controllers/ContraseñaRecuperar.js";


const RouterPassword = Router()

RouterPassword.post('/password', IdVerify, passwordForgot);
RouterPassword.post('/password/:idusuarios/:token', verifyResetToken, resetPassword);

export default RouterPassword   