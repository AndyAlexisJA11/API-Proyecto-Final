import {Router} from "express"
import {getClientes, createClientes, updateClientes, deleteClientes, getCliente} 
from "../controllers/clientes.controller.js"

const router = Router()

router.get('/Clientes', getClientes)

router.get('/Clientes/:ID_CLiente', getCliente)

router.post('/Clientes', createClientes)

router.patch('/Clientes/:ID_Cliente', updateClientes)

router.delete('/Clientes/:ID_cliente', deleteClientes)

export default router