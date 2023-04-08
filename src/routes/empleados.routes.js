import { Router } from "express";
import {obtieneEmpleados, obtieneEmpleado, registraEmpleados, actualizaEmpleados, eliminaEmpleados} from '../controllers/empleados.controller.js';

const router =  Router();

router.get('/empleados',obtieneEmpleados);

router.get('/empleados/:id',obtieneEmpleado);

router.post('/empleados',registraEmpleados);

router.patch('/empleados/:id',actualizaEmpleados);

router.delete('/empleados/:id',eliminaEmpleados);

export default router;
