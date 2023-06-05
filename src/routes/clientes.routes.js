import {Router} from "express"
import {getClientes, createClientes, updateClientes, deleteClientes, getCliente} 
from "../controllers/clientes.controller.js"

const router = Router()

router.get('/Clientes', getClientes)

router.get('/Clientes/:ID_Cliente', getCliente)

router.post('/Clientes', createClientes)

router.patch('/Clientes/:ID_Cliente', updateClientes)

router.delete('/Clientes/:ID_Cliente', deleteClientes)

export default router