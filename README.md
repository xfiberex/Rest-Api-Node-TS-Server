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

## 🚀 Despliegue

### Producción

1. **Compilar TypeScript**
```bash
npm run build
```

2. **Configurar variables de entorno de producción**
```env
DATABASE_URL=postgresql://...
PORT=4000
NODE_ENV=production
```

3. **Iniciar servidor**
```bash
node dist/index.js
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 4000
CMD ["node", "dist/index.js"]
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

## 📄 Licencia

ISC

## 👨‍💻 Autor

**Ricky Jimenez**

## 🔗 Enlaces Útiles

- [Express Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Jest Documentation](https://jestjs.io/)
- [Swagger Documentation](https://swagger.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📈 Mejorar posibles

- Autenticación JWT
- Paginación de resultados
- Filtros y búsqueda avanzada
- Upload de imágenes de productos
- Cache con Redis
- Rate limiting
- WebSockets para actualizaciones en tiempo real
