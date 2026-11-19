import app from "./server.js";
import { envConfig } from "./config/env.config.js";

const { port } = envConfig

app.listen(port, console.log(`Escuchando en el puerto http://localhost:${port}/`))
