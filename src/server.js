import express from "express"

import routingDetector from "./middlewares/routing.js";

import servicesRouter from "./routes/services.router.js"
import clientesRouter from "./routes/clients.router.js"

// Settings
const app = express()

// Middlewares

app.use(express.json())
app.use(routingDetector)

// Routes

app.use("/api/services", servicesRouter)

app.use("/api/clientes", clientesRouter)

app.get("/", (req, res) => {
    res.send("hola mundo")
})



export default app