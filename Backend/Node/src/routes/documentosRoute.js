import { Router } from 'express';
import { RegistrarDocs, ActualizarDocs } from '../controllers/AlmacenaDocController.js';

const routerDocumento = Router();

routerDocumento.post('/documentos', RegistrarDocs);
routerDocumento.patch('/:id_documentos', ActualizarDocs);

export default routerDocumento;
