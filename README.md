# Backend - Sistema de Turnos y Reservas

## Descripción

Segundo entregable de Backend I desarrollado con Node.js, JavaScript y Express. Permite gestionar servicios mediante una API REST, implementando operaciones CRUD y persistencia de datos en archivos JSON.

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

El servidor estará disponible en `http://localhost:8080`, utilizando el puerto configurado en las variables de entorno.

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
│   └── services.json
├── managers/
│   └── ServiceManager.js
├── middlewares/
│   └── routing.js
├── routes/
│   ├── clients.router.js
│   └── services.router.js
├── app.js
└── server.js
```

## Recurso: Servicios

Cada servicio contiene:

- id
- name
- description
- duration
- price
- category
- available

Los datos se almacenan en `src/data/services.json`.

## Operaciones disponibles

La API utiliza el prefijo `/api/services`.

| **Método HTTP** | **Ruta**             | **Descripción**             |
| --------------- | -------------------- | --------------------------- |
| GET             | `/api/services`      | Obtiene todos los servicios |
| GET             | `/api/services/:sid` | Busca un servicio por ID    |
| POST            | `/api/services`      | Crea un nuevo servicio      |
| PUT             | `/api/services/:sid` | Actualiza un servicio       |
| DELETE          | `/api/services/:sid` | Elimina un servicio         |

### Filtros disponibles

El endpoint `GET /api/services` permite filtrar los servicios mediante query params:

- Por categoría: `?category=barba`
- Por disponibilidad: `?available=true`
- Combinando ambos filtros: `?category=barba&available=true`

### Ejemplo de creación de un servicio

Para crear un servicio mediante `POST /api/services`, se debe enviar un body en formato JSON:

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

El ID se genera automáticamente en el servidor mediante `randomUUID()`.

## Organización

- **env.config.js:** carga y configura las variables de entorno.
- **ServiceManager.js:** contiene la lógica de las operaciones CRUD y la persistencia de datos.
- **services.router.js:** define las rutas del recurso servicios y gestiona las respuestas HTTP.
- **routing.js:** contiene el middleware de identificación de rutas.
- **server.js:** configura Express, los middlewares y los routers.
- **app.js:** inicia el servidor.

---

**Proyecto desarrollado como parte del módulo Backend I de Coderhouse.**
