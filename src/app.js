import app from "./server.js";
import { envConfig } from "./config/env.config.js";

const { port } = envConfig

app.listen(port, console.log(`Escuchando en el puerto http://localhost:${port}/`))


// Actividad

// Diseño de endpoints REST para servicios
// Diseño de endpoints REST para servicios
// Objetivo Construir una API REST con Express que exponga endpoints para gestionar el recurso services, conectando las rutas con el ServiceManager de la entrega anterior.

// Qué entregar
// Un repositorio público de GitHub con la siguiente estructura:



// src/  config/env.config.js
//   managers/ServiceManager.js
//   routes/services.router.js
//   app.js
//   server.js
// package.json
// .env.example
// .gitignore
// README.md
// Criterios de aceptación
// Configuración

// Servidor Express configurado con ESM y puerto leído desde .env vía dotenv
// Router de servicios implementado con express.Router() en services.router.js
// La lógica de servicios permanece en ServiceManager; app.js no la contiene directamente
// Endpoints



// Método	Ruta	Comportamiento
// GET	/api/services	Devuelve todos los servicios. Acepta filtros por query params: ?category=salud, ?available=true
// GET	/api/services/:sid	Devuelve el servicio por id. 200 si existe, 404 si no
// POST	/api/services	Crea un servicio con los datos del body. id generado automáticamente. 201 si se crea, 400 si faltan campos
// PUT	/api/services/:sid	Actualiza el servicio. No permite modificar el id. 200 si existe, 404 si no
// DELETE	/api/services/:sid	Elimina el servicio. 200 si existe, 404 si no
// Uso correcto de Express

// req.params para leer :sid
// req.query para leer filtros en GET /api/services
// req.body para leer datos en POST y PUT
// Cómo entregar
// Link al repositorio público de GitHub, sin node_modules, .env ni credenciales reales.

// Qué evitar
// No enviar el id en el body del POST; debe generarse internamente
// No poner la lógica del ServiceManager directamente en app.js
// No omitir los códigos de estado HTTP (200, 201, 400, 404)
// Construir una primera API REST con Express para gestionar el recurso services dentro del Sistema Backend de Turnos y Reservas.
// Entregable

// Diseño de endpoints REST para servicios
// En esta pre entrega vas a construir los primeros endpoints REST para el recurso services del Sistema Backend de Turnos y Reservas.

// El foco principal estará en aprender a diseñar rutas con Express y a recibir información desde diferentes partes de una petición HTTP. Vas a trabajar con parámetros dinámicos para buscar servicios por id, query params para filtrar servicios por categoría o disponibilidad, y body para crear o actualizar servicios.

// Esta entrega no busca todavía desarrollar el sistema completo de reservas ni trabajar con una arquitectura avanzada. El objetivo es que puedas comprender cómo se organiza un recurso dentro de una API REST y cómo se comunica un cliente con el servidor mediante rutas bien definidas.