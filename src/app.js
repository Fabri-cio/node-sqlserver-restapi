import express from "express";
import productRoutes from "./routes/productos.routes.js";

const app = express()

app.use(express.json())
app.use(productRoutes)

export default app