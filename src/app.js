
// AQUI VOY A PONER LA CORRECCION QUE ME DA PARA LA INTERFAZ
import express from "express";
import indexRoutes from "./routes/index.routes.js";
import ClientesRoutes from "./routes/clientes.routes.js";
import cors from "cors";

const app = express();

// Habilitar CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);
app.use('/api', ClientesRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

export default app;
