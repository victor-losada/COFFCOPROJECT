import { check } from "express-validator";
 export const validarCampos = [
    check('nombre','el nombre es obligatorio').not().isEmpty({max:50}),
    check('apellidos','el nombre es obligatorio').not().isEmpty({max:50}),
    check('correo_electronico','el nombre es obligatorio').not().isEmpty({max:50}),
    check('telefono','el nombre es obligatorio').not().isEmpty({max:50}),
    check('fecha','el nombre es obligatorio').not().isEmpty(),
 ]
