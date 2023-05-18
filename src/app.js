
import  Express  from "express";
import ClientesRoutes from "./routes/clientes.routes.js";
import indexRoutes from "./routes/index.routes.js"

import {PORT} from './config.js'

const app = Express()

app.use(Express.json())

app.use(indexRoutes)
app.use('/api', ClientesRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        message: "endpoint not found"
    })
})

export default app;