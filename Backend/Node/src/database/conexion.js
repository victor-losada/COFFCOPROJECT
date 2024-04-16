import { createPool } from "mysql2/promise";
<<<<<<< HEAD
export  const conexion = createPool({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'coffco'
})  
=======
import dotenv from "dotenv"
dotenv.config({ path: 'env/.env' })


export const conexion = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
})
>>>>>>> 84665c1206a9fd3b78d8b3e30b4c6a2192dd0268
