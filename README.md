# Backend - Sistema de Turnos y Reservas

## Descripción

Tercer entregable API REST desarrollada con Node.js, Express y FileSystem que gestiona dos recursos principales: **servicios** y **reservas**, con persistencia de datos en archivos JSON (`services.json` y `bookings.json`).

## Tecnologías

- Node.js
- Express
- JavaScript (ES Modules)
- dotenv
- File System (`node:fs/promises`)
- Node Crypto (`node:crypto`)

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto siguiendo el formato de `.env.example`.

## Ejecución

Modo desarrollo:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

El servidor estará disponible en `http://localhost:8080` (o el puerto configurado en las variables de entorno).

## Variables de entorno

| **Variable** | **Descripción**      |
| ------------ | -------------------- |
| PORT         | Puerto de ejecución  |
| NODE_ENV     | Entorno de ejecución |
| APP_NAME     | Nombre del proyecto  |

## Estructura del proyecto

```text
src/
├── config/
│   └── env.config.js
├── data/
│   ├── bookings.json
│   └── services.json
├── managers/
│   ├── BookingManager.js
│   └── ServiceManager.js
├── middlewares/
│   └── routing.js
├── routes/
│   ├── bookings.router.js
│   └── services.router.js
├── app.js
└── server.js
```

---

## Recursos de la API

### 1. Servicios (`/api/services`)

Cada servicio contiene:

- `id` (generado automáticamente)
- `name`
- `description`
- `duration`
- `price`
- `category`
- `available`

Los datos se almacenan en `src/data/services.json`.

#### Endpoints disponibles

| **Método HTTP** | **Ruta**             | **Descripción**                                     |
| --------------- | -------------------- | --------------------------------------------------- |
| GET             | `/api/services`      | Devuelve todos los servicios (soporta query params) |
| GET             | `/api/services/:sid` | Devuelve un servicio específico por ID              |
| POST            | `/api/services`      | Crea un nuevo servicio (valida todos los campos)    |
| PUT             | `/api/services/:sid` | Actualiza un servicio (el ID no se puede modificar) |
| DELETE          | `/api/services/:sid` | Elimina un servicio por ID                          |

#### Filtros disponibles

El endpoint `GET /api/services` permite filtrar los servicios mediante query params:

- Por categoría: `?category=barba`
- Por disponibilidad: `?available=true`
- Combinando ambos filtros: `?category=barba&available=true`

#### Ejemplo de creación de un servicio (`POST /api/services`)

```json
{
   "name": "Corte de cabello",
   "description": "Corte clásico",
   "duration": 30,
   "price": 5000,
   "category": "barba",
   "available": true
}
```

---

### 2. Reservas (`/api/bookings`)

Cada reserva contiene:

- `id` (generado automáticamente)
- `clientName`
- `clientEmail`
- `date`
- `time`
- `status`
- `services` (Array de objetos con la estructura: `{ "service": "idDelServicio", "quantity": 1 }`. Si se agrega un servicio ya existente en la reserva, se incrementa su `quantity`).

Los datos se almacenan en `src/data/bookings.json`.

#### Endpoints disponibles

| **Método HTTP** | **Ruta**                           | **Descripción**                                                                |
| --------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| POST            | `/api/bookings`                    | Crea una nueva reserva (puede iniciarse con `services` vacío)                  |
| GET             | `/api/bookings/:bid`               | Devuelve una reserva específica por ID                                         |
| POST            | `/api/bookings/:bid/services/:sid` | Agrega un servicio a una reserva existente (valida que ambos recursos existan) |

#### Ejemplo de creación de una reserva (`POST /api/bookings`)

```json
{
   "clientName": "Juan Pérez",
   "clientEmail": "juan.perez@email.com",
   "date": "2026-11-20",
   "time": "15:30",
   "status": "pending",
   "services": []
}
```

---

## Arquitectura y Organización

- **`ServiceManager.js`:** Gestiona la persistencia y operaciones CRUD sobre `services.json` mediante los métodos: `getServices`, `getServiceById`, `addService`, `updateService` y `deleteService`.
- **`BookingManager.js`:** Gestiona la persistencia y operaciones sobre `bookings.json` mediante los métodos: `createBooking`, `getBookingById` y `addServiceToBooking`.
- **`services.router.js` / `bookings.router.js`:** Definen las rutas de cada recurso, validan parámetros/cuerpos de petición y gestionan las respuestas HTTP.
- **`routing.js`:** Middleware centralizado para la identificación y gestión de rutas.
- **`env.config.js`:** Carga y configura las variables de entorno de la aplicación.
- **`server.js`:** Configuración de Express, middlewares globales y montaje de routers.
- **`app.js`:** Punto de entrada principal que inicia el servidor.

---

**Proyecto desarrollado como parte del módulo Backend I de Coderhouse.**
