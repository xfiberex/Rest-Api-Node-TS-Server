import express from "express";
import router from "./router";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import { generalLimiter } from "./middleware/rateLimiter";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

// Conectar a base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        await db.sync();
        console.log(colors.green.bold("Conexión exitosa a la base de datos"));
    } catch (error) {
        console.log(error);
        console.log(
            colors.red.bold("Hubo un error al conectar la base de datos")
        );
    }
}

// Solo conectar si no estamos en entorno de test
if (process.env.NODE_ENV !== "test") {
    connectDB();
}

const server = express();

// ========== CONFIGURACIÓN DE PROXY ==========

// Confiar en proxy reverso (necesario para Render, Heroku, etc.)
// Permite que Express obtenga la IP real del cliente desde headers X-Forwarded-*
server.set("trust proxy", 1);

// ========== SEGURIDAD ==========

// Helmet - Configurar headers de seguridad HTTP
server.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"], // Para Swagger UI
                scriptSrc: ["'self'", "'unsafe-inline'"], // Para Swagger UI
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
        crossOriginEmbedderPolicy: false, // Para Swagger UI
    })
);

// HPP - Protección contra HTTP Parameter Pollution
server.use(hpp());

// Rate Limiting - Limitar peticiones para prevenir ataques de fuerza bruta
server.use(generalLimiter);

// Permitir conexiones - CORS
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        // Permitir peticiones sin origin (como mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error("Error de CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
server.use(cors(corsOptions));

// ========== BODY PARSING ==========

// Leer datos de formularios con límite de tamaño
server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ========== LOGGING ==========

// Más detalles sobre las peticiones en consola
if (process.env.NODE_ENV === "development") {
    server.use(morgan("dev"));
} else {
    server.use(morgan("combined"));
}

// ========== RUTAS ==========

// Ruta de health check para Render
server.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "API de Inventario de Productos",
        version: "1.0.0",
        endpoints: {
            products: "/api/products",
            docs: "/docs"
        }
    });
});

// Documentación de API's con Swagger
server.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, swaggerUIOptions)
);

// Englobar métodos REST API desde router.ts
server.use("/api/products", router);

// ========== MANEJO DE ERRORES ==========

// Manejar rutas no encontradas
server.use(notFoundHandler);

// Middleware de manejo de errores centralizado (debe ir al final)
server.use(errorHandler);

export default server;
