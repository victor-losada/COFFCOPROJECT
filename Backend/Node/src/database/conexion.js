<<<<<<< HEAD
import { createPool } from "mysql2/promise";

import dotenv from "dotenv"
dotenv.config({ path: 'env/.env' })


export const conexion = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
})
=======
import { createPool } from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config({path:'./env/.env'})

export const conexion = createPool(
    {
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE,
})
>>>>>>> 4ac6141967c22331d94c2fbe4278dbceac01b6b6
