import {Router} from "express"
import {getClientes, createClientes, updateClientes, deleteClientes, getCliente} 
from "../controllers/usuarios.controller.js"

const router = Router()

router.get('/Clientes', getClientes)

router.get('/Clientes/:id', getCliente)

router.post('/Clientes', createClientes)

router.patch('/Clientes/:id', updateClientes)

router.delete('/Clientes/:id', deleteClientes)

export default router