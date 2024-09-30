import { Router } from "express";
import { priceDelete, priceGet, priceRegister, priceStatus, priceUpdate } from "../controllers/Precios.js";


const priceRouter = Router()

priceRouter.post("/pricepost", priceRegister)
priceRouter.patch("/priceupdate/:idprecio", priceUpdate)
priceRouter.put("/pricestatus/:idprecio", priceStatus)
priceRouter.delete("/pricedelete/:idprecio", priceDelete)
priceRouter.get("/priceobtener", priceGet)

export default priceRouter