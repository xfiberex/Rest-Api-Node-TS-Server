# Inventario de Productos - Server

REST API para la gestión de inventario de productos, construida con Node.js, Express, TypeScript y PostgreSQL.

## Tecnologías

- **Node.js** con **Express**
- **TypeScript**
- **PostgreSQL** con **Sequelize**
- **Express Validator** - Validación de datos
- **Swagger** - Documentación de API
- **Jest** y **Supertest** - Testing

## Características

- CRUD completo de productos
- Validación de datos
- Documentación API interactiva
- Tests con Jest
- CORS habilitado
- Arquitectura MVC

## 📁 Estructura del Proyecto

```
Server/
├── src/
│   ├── __tests__/          # Tests de integración
│   │   └── server.test.ts
│   ├── config/             # Configuraciones
│   │   ├── db.ts           # Conexión a base de datos
│   │   └── swagger.ts      # Configuración de Swagger
│   ├── controllers/        # Controladores
│   │   ├── productController.ts
│   │   └── __test__/       # Tests de controladores
│   │       └── productController.test.ts
│   ├── data/               # Scripts de datos
│   │   └── clearDatabase.ts
│   ├── middleware/         # Middlewares personalizados
│   │   └── index.ts
│   ├── models/             # Modelos de Sequelize
│   │   └── Product.model.ts
│   ├── index.ts            # Punto de entrada
│   ├── router.ts           # Definición de rutas
│   └── server.ts           # Configuración del servidor
├── coverage/               # Reportes de cobertura de tests
├── jest.config.js
├── jest.setup.js
├── package.json
└── tsconfig.json
```

## Instalación

```bash
npm install
```

Configura las variables de entorno en `.env`:

```env
DATABASE_URL_TEST=postgres://usuario:password@localhost:5432/inventario_test
DATABASE_URL=postgres://usuario:password@localhost:5432/inventario_prod
PORT=4000
```

## Scripts

```bash
npm run dev          # Desarrollo
npm run build        # Compilar
npm test             # Tests
npm run test:coverage # Cobertura
```

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener un producto por ID |
| POST | `/api/products` | Crear un nuevo producto |
| PUT | `/api/products/:id` | Actualizar un producto completo |
| PATCH | `/api/products/:id` | Actualizar disponibilidad |
| DELETE | `/api/products/:id` | Eliminar un producto |

Documentación interactiva disponible en: `http://localhost:4000/docs`

## Modelo de Datos

```typescript
{
  id: number;
  name: string;
  price: number;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🧪 Testing

El proyecto incluye tests completos con Jest:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage

# Ver reporte de cobertura
# Abre coverage/lcov-report/index.html en el navegador
```

### Tipos de Tests

1. **Tests de Servidor**: Verifican que el servidor inicie correctamente
2. **Tests de Endpoints**: Prueban cada endpoint de la API
3. **Tests de Controladores**: Verifican la lógica de negocio
4. **Tests de Validación**: Aseguran que las validaciones funcionen

### Cobertura Actual

El proyecto mantiene alta cobertura de código:
- ✅ Statements: >90%
- ✅ Branches: >85%
- ✅ Functions: >90%
- ✅ Lines: >90%

## 📚 Documentación Swagger

Accede a la documentación interactiva en:

```
http://localhost:4000/docs
```

Características:
- 📖 Documentación completa de endpoints
- 🧪 Pruebas de API en el navegador
- 📝 Esquemas de datos
- ✅ Validaciones y respuestas

## 🏗️ Arquitectura

### Patrón MVC

```
Request → Router → Middleware → Controller → Model → Database
                                    ↓
                                Response
```

### Flujo de Datos

1. **Router**: Define las rutas y asocia con controladores
2. **Middleware**: Valida datos de entrada
3. **Controller**: Maneja la lógica de negocio
4. **Model**: Interactúa con la base de datos
5. **Response**: Devuelve datos al cliente

## 🔐 Seguridad

- ✅ Validación y sanitización de inputs
- ✅ CORS configurado correctamente
- ✅ Prevención de inyección SQL (Sequelize ORM)
- ✅ Variables de entorno para datos sensibles
- ✅ Manejo de errores centralizado

## Despliegue en Render

### 1. Preparar el Proyecto

Asegúrate de que tu repositorio esté en GitHub y que el `package.json` tenga los scripts necesarios:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}
```

### 2. Crear Base de Datos PostgreSQL en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. Click en **"New +"** → **"PostgreSQL"**
3. Configura:
   - **Name**: `inventario-db` (o el nombre que prefieras)
   - **Database**: `inventario_prod`
   - **User**: Se genera automáticamente
   - **Region**: Selecciona la más cercana
   - **Plan**: Free (o el que necesites)
4. Click en **"Create Database"**
5. **Guarda la URL de conexión** (Internal Database URL)

### 3. Crear Web Service en Render

1. En el Dashboard, click en **"New +"** → **"Web Service"**
2. Conecta tu repositorio de GitHub
3. Configura el servicio:
   - **Name**: `inventario-api` (o el nombre que prefieras)
   - **Region**: La misma que la base de datos
   - **Branch**: `main`
   - **Root Directory**: `Server` (si está en una carpeta)
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (o el que necesites)

### 4. Configurar Variables de Entorno

En la sección **"Environment"** agrega:

```
DATABASE_URL=<Internal_Database_URL_de_tu_BD>
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://tu-app.vercel.app
```

> **Importante**: 
> - La `DATABASE_URL` (no `DATABASE_URL_TEST`) la obtienes de tu base de datos PostgreSQL creada en el paso 2
> - Usa la **Internal Database URL** que tiene este formato: `postgres://user:password@hostname/database`
> - Agrega `FRONTEND_URL` con la URL de tu cliente en Vercel para configurar CORS

### 5. Desplegar

1. Click en **"Create Web Service"**
2. Render automáticamente:
   - Instalará las dependencias
   - Compilará TypeScript
   - Iniciará el servidor
3. Una vez desplegado, obtendrás una URL como: `https://inventario-api.onrender.com`

### 6. Verificar el Despliegue

Prueba los endpoints:
- `https://tu-app.onrender.com/api/products`
- `https://tu-app.onrender.com/docs` (Swagger UI)

### 7. Configurar Auto-Deploy (Opcional)

Render automáticamente redesplega cuando haces push a la rama `main`.

### Notas Importantes

- ⚠️ **Plan Free**: El servidor se suspende después de 15 minutos de inactividad. La primera petición puede tardar 30-60 segundos.
- 🔄 **Sincronización de BD**: Sequelize creará las tablas automáticamente si no existen.
- 🌍 **CORS**: Asegúrate de configurar CORS para permitir peticiones desde tu dominio de Vercel.

### Actualizar CORS para Producción

En tu archivo `server.ts`, actualiza la configuración de CORS:

```typescript
import cors from 'cors';

const corsOptions = {
    origin: function(origin, callback) {
        const whitelist = [
            process.env.FRONTEND_URL, // URL de Vercel
            'http://localhost:5173'    // Desarrollo local
        ];
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

server.use(cors(corsOptions));
```

Agrega en las variables de entorno de Render:
```
FRONTEND_URL=https://tu-app.vercel.app
```

## 📊 Logging

El servidor utiliza Morgan para logging HTTP:

```
GET /api/products 200 45.123 ms - 1234
POST /api/products 201 23.456 ms - 567
```

Colores en terminal para mejor visualización:
- 🟢 Verde: Operaciones exitosas
- 🔴 Rojo: Errores
- 🟡 Amarillo: Advertencias
- 🔵 Azul: Información

## 🛠️ Desarrollo

### Agregar un Nuevo Endpoint

1. Crear el método en el controlador
2. Agregar la ruta en `router.ts`
3. Agregar validaciones si es necesario
4. Documentar en Swagger
5. Crear tests

### Debugging

```bash
# Con breakpoints en VS Code
# Configurar launch.json con ts-node
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Autor

**Ricky Angel Jiménez Bueno**

## 🔗 Enlaces Útiles

- [Express Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Jest Documentation](https://jestjs.io/)
- [Swagger Documentation](https://swagger.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📈 Posibles Mejoras

- Autenticación JWT
- Paginación de resultados
- Filtros y búsqueda avanzada
- Upload de imágenes de productos
- Cache con Redis
- Rate limiting
- WebSockets para actualizaciones en tiempo real
