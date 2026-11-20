import app from "./app.js";
import { envConfig } from "./config/env.config.js";

const { port } = envConfig

app.listen(port, console.log(`Escuchando en el puerto http://localhost:${port}/`))