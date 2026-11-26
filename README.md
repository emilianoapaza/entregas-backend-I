# Backend - Sistema de Turnos y Reservas

## Descripción

Cuarto entregable API REST desarrollada con Node.js, Express y FileSystem que gestiona dos recursos principales: **servicios** y **reservas**, con persistencia de datos en archivos JSON (`services.json` y `bookings.json`).

En esta pre-entrega el proyecto se reorganizó separando responsabilidades en tres capas (**Routers**, **Controllers** y **Managers**), manteniendo intactas las rutas y el comportamiento externo de la API como base para futuras etapas con base de datos, validaciones y nuevas capas.

## Tecnologías

- Node.js
- Express
- JavaScript (ES Modules)
- dotenv
- File System (`node:fs/promises`)

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz del proyecto siguiendo el formato de `.env.example` (sin subir `.env` ni `node_modules` al repositorio).

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
├── controllers/
│   ├── bookings.controller.js
│   └── services.controller.js
├── data/
│   ├── bookings.json
│   └── services.json
├── managers/
│   ├── BookingManager.js
│   └── ServiceManager.js
├── routes/
│   ├── bookings.router.js
│   └── services.router.js
├── app.js
└── server.js
package.json
.env.example
.gitignore
README.md
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
| GET             | `/api/bookings/`                   | Devuelve todas las reservas                                                    |
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

- **Routers (`services.router.js`, `bookings.router.js`):** Definen los endpoints y los conectan con su respectivo controller, sin lógica de negocio ni acceso directo a archivos JSON.
- **Controllers (`services.controller.js`, `bookings.controller.js`):** Leen `req.params`, `req.query` y `req.body`, llaman al manager correspondiente y responden con `res.status().json()`.
   - `services.controller.js`: `getServices`, `getServiceById`, `createService`, `updateService` y `deleteService` (delega en `ServiceManager`).
   - `bookings.controller.js`: `createBooking`, `getBookingById` y `addServiceToBooking` (delega en `BookingManager`, validando la existencia del servicio mediante `ServiceManager`).
- **Managers (`ServiceManager.js`, `BookingManager.js`):** Gestionan la persistencia y lógica de datos sobre `services.json` y `bookings.json` sin utilizar `req` ni `res`.
- **Configuración y arranque (`env.config.js`, `app.js`, `server.js`):** Cargan las variables de entorno, configuran la aplicación Express, montan las rutas y levantan el servidor.

---

**Proyecto desarrollado como parte del módulo Backend I de Coderhouse.**
