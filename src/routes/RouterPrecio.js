import { Router } from "express";
import { priceDelete, priceGet, priceRegister, priceStatus, priceUpdate } from "../controllers/Precios.js";
import { validationToken, verificarRol } from "../controllers/Authentication.js";


const priceRouter = Router()

priceRouter.post("/pricepost",validationToken, verificarRol([1]), priceRegister)
priceRouter.patch("/priceupdate/:idprecio",validationToken, verificarRol([1]), priceUpdate)
priceRouter.put("/pricestatus/:idprecio",validationToken, verificarRol([1]), priceStatus)
priceRouter.delete("/pricedelete/:idprecio",validationToken, verificarRol([1]), priceDelete)
priceRouter.get("/priceobtener",validationToken, verificarRol([1]), priceGet)

export default priceRouter