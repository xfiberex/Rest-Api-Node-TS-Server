# REST API - Inventario de Productos

API RESTful desarrollada con Node.js, Express y TypeScript para la gestión de inventario de productos. Incluye autenticación, validación de datos, documentación con Swagger, y pruebas unitarias.

## 🚀 Características

- ✅ **CRUD completo** de productos
- ✅ **TypeScript** para tipado estático
- ✅ **PostgreSQL** con Sequelize ORM
- ✅ **Documentación interactiva** con Swagger UI
- ✅ **Validación de datos** con Express Validator
- ✅ **Seguridad** con Helmet, CORS, HPP
- ✅ **Rate Limiting** para prevenir abuso
- ✅ **Testing** con Jest y Supertest
- ✅ **Logging** con Morgan
- ✅ **Manejo de errores** centralizado

## 📋 Requisitos Previos

- Node.js >= 16.x
- PostgreSQL >= 12.x
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd Server
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/inventario_db
DATABASE_URL_TEST=postgres://usuario:contraseña@localhost:5432/inventario_test_db

# Servidor
PORT=3000
NODE_ENV=development

# Frontend
FRONTEND_URL=http://localhost:5173
```

4. **Inicializar la base de datos**

La base de datos se sincronizará automáticamente al iniciar el servidor.

## 🚀 Uso

### Modo Desarrollo
```bash
npm run dev
```

### Modo Producción
```bash
npm run build
npm start
```

### Ejecutar Tests
```bash
# Tests con cobertura
npm run test:coverage

# Tests simples
npm test
```

## 📚 Documentación de la API

Una vez iniciado el servidor, accede a la documentación interactiva de Swagger:

```
http://localhost:3000/docs
```

## 🔌 Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/products` | Obtener todos los productos |
| `GET` | `/api/products/:id` | Obtener un producto por ID |
| `POST` | `/api/products` | Crear un nuevo producto |
| `PUT` | `/api/products/:id` | Actualizar un producto completo |
| `PATCH` | `/api/products/:id` | Actualizar disponibilidad del producto |
| `DELETE` | `/api/products/:id` | Eliminar un producto |

### Ejemplo de Petición

**Crear Producto:**
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Monitor Curvo 49 Pulgadas",
  "price": 399
}
```

**Respuesta:**
```json
{
  "id": 1,
  "name": "Monitor Curvo 49 Pulgadas",
  "price": 399,
  "availability": true,
  "createdAt": "2025-11-18T10:00:00.000Z",
  "updatedAt": "2025-11-18T10:00:00.000Z"
}
```

## 🏗️ Estructura del Proyecto

```
Server/
├── src/
│   ├── config/          # Configuración de BD, Swagger, validaciones
│   ├── controllers/     # Controladores de las rutas
│   ├── data/           # Scripts de utilidad para BD
│   ├── middleware/     # Middlewares personalizados
│   ├── models/         # Modelos de Sequelize
│   ├── __tests__/      # Tests unitarios e integración
│   ├── index.ts        # Punto de entrada de la aplicación
│   ├── router.ts       # Definición de rutas
│   └── server.ts       # Configuración del servidor Express
├── jest.config.js      # Configuración de Jest
├── tsconfig.json       # Configuración de TypeScript
└── package.json        # Dependencias y scripts
```

## 🔒 Seguridad

El proyecto incluye las siguientes medidas de seguridad:

- **Helmet**: Configura headers HTTP seguros
- **CORS**: Control de acceso entre dominios
- **HPP**: Protección contra HTTP Parameter Pollution
- **Rate Limiting**: Limitación de peticiones por IP
- **Validación de datos**: Sanitización de entradas con Express Validator
- **Manejo de errores**: Sistema centralizado de manejo de errores

## 🧪 Testing

El proyecto incluye tests completos para controladores y rutas:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage

# Los tests limpian automáticamente la BD antes de ejecutarse
npm run pretest
```

## 📦 Tecnologías Utilizadas

### Core
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **TypeScript** - Superset de JavaScript con tipado

### Base de Datos
- **PostgreSQL** - Base de datos relacional
- **Sequelize** - ORM para Node.js
- **Sequelize-TypeScript** - Decoradores para modelos

### Seguridad
- **Helmet** - Headers de seguridad HTTP
- **CORS** - Cross-Origin Resource Sharing
- **HPP** - HTTP Parameter Pollution protection
- **express-rate-limit** - Rate limiting

### Validación y Documentación
- **express-validator** - Validación de datos
- **Swagger** - Documentación de API
- **swagger-jsdoc** - Generación de docs desde JSDoc
- **swagger-ui-express** - UI para documentación

### Testing
- **Jest** - Framework de testing
- **Supertest** - Testing de HTTP
- **ts-jest** - Soporte de TypeScript para Jest

### Utilidades
- **Morgan** - HTTP request logger
- **Colors** - Colores en consola
- **dotenv** - Variables de entorno

## 👤 Autor

**Ricky Angel Jiménez Bueno**

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o solicitar características, por favor abre un issue en el repositorio.
