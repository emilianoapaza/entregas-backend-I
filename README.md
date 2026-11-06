# Backend - Sistema de Turnos y Reservas

## Descripción

Primer entregable de Backend I desarrollado con Node.js y JavaScript. Permite gestionar servicios mediante operaciones CRUD y persistencia en archivos JSON.

## Tecnologías

- Node.js
- JavaScript (ES Modules)
- dotenv
- File System (`node:fs/promises`)

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

## Variables de entorno

| Variable  | Descripción          |
| --------- | -------------------- |
| PORT      | Puerto de ejecución  |
| NODE_ENV  | Entorno de ejecución |
| APP_NAME  | Nombre del Proyecto  |
| MONGO_URI | Tu uri de mongodb    |

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

| Método                  | Descripción                 |
| ----------------------- | --------------------------- |
| getServices()           | Obtiene todos los servicios |
| getServiceById(id)      | Busca un servicio por ID    |
| addService(data)        | Agrega un servicio          |
| updateService(id, data) | Actualiza un servicio       |
| deleteService(id)       | Elimina un servicio         |

---

## Ejemplos de Uso

A continuación se muestran ejemplos de cómo utilizar cada uno de los métodos del gestor de servicios en tu código (asumiendo una importación previa de la clase o funciones del servicio):

### 1. `getServices()`

Obtiene el listado completo de todos los servicios almacenados.

- **Código:**
   ```javascript
   const services = await serviceManager.getServices();
   console.log(services);
   ```
- **Salida esperada:**
   ```json
   [
      {
         "id": "1",
         "name": "Corte Clásico",
         "description": "Corte de cabello estilo tradicional con acabado",
         "duration": 30,
         "price": 1200,
         "category": "Peluquería",
         "available": true
      },
      {
         "id": "2",
         "name": "Manicuría Completa",
         "description": "Limpieza, esculpido y esmaltado semipermanente",
         "duration": 45,
         "price": 2500,
         "category": "Estética",
         "available": true
      }
   ]
   ```

---

### 2. `getServiceById(id)`

Busca y retorna un servicio específico según su identificador único.

- **Entrada:** `"1"`
- **Código:**
   ```javascript
   const service = await serviceManager.getServiceById("1");
   console.log(service);
   ```
- **Salida esperada:**
   ```json
   {
      "id": "1",
      "name": "Corte Clásico",
      "description": "Corte de cabello estilo tradicional con acabado",
      "duration": 30,
      "price": 1200,
      "category": "Peluquería",
      "available": true
   }
   ```

---

### 3. `addService(data)`

Registra un nuevo servicio en el sistema asignándole un `id` único y lo persiste en el archivo JSON.

- **Entrada (`data`):**
   ```json
   {
      "name": "Barba Completa",
      "description": "Perfilado y recorte de barba con navaja",
      "duration": 20,
      "price": 900,
      "category": "Peluquería",
      "available": true
   }
   ```
- **Código:**

   ```javascript
   const newServiceData = {
      name: "Barba Completa",
      description: "Perfilado y recorte de barba con navaja",
      duration: 20,
      price: 900,
      category: "Peluquería",
      available: true,
   };

   const createdService = await serviceManager.addService(newServiceData);
   console.log(createdService);
   ```

- **Salida esperada:**
   ```json
   {
      "id": "3",
      "name": "Barba Completa",
      "description": "Perfilado y recorte de barba con navaja",
      "duration": 20,
      "price": 900,
      "category": "Peluquería",
      "available": true
   }
   ```

---

### 4. `updateService(id, data)`

Actualiza los campos de un servicio existente identificado por su `id`.

- **Entrada:** `id = "1"`, `data = { "price": 1400, "available": false }`
- **Código:**
   ```javascript
   const updated = await serviceManager.updateService("1", {
      price: 1400,
      available: false,
   });
   console.log(updated);
   ```
- **Salida esperada:**
   ```json
   {
      "id": "1",
      "name": "Corte Clásico",
      "description": "Corte de cabello estilo tradicional con acabado",
      "duration": 30,
      "price": 1400,
      "category": "Peluquería",
      "available": false
   }
   ```

---

### 5. `deleteService(id)`

Elimina un servicio del sistema basándose en su `id`.

- **Entrada:** `"2"`
- **Código:**
   ```javascript
   const result = await serviceManager.deleteService("2");
   console.log(result);
   ```
- **Salida esperada:**
   ```json
   {
      "success": true,
      "message": "Servicio con ID 2 eliminado correctamente"
   }
   ```
