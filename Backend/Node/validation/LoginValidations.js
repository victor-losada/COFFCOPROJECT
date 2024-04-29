import { check } from "express-validator";
export const validationsLogin=[
    check("numero_identificacion","El numero de identificacion es obligatorio").not().isEmpty().isInt().isLength({max:50}),
    check("contraseña_usuario","La contraseña es obligatoria").not().isEmpty().isLength({max:60}),
]