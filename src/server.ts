import express from "express";
import router from "./router";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { error } from "console";

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

// Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new error("Errors de CORS"));
        }
    },
};
server.use(cors(corsOptions));

// Leer datos de formularios
server.use(express.json());

// Mas detalles sobre las peticiones en consola
server.use(morgan("dev"));

// Englobar metodos REST API desde router.ts
server.use("/api/products", router);

// Documentación de API's con Swagger
server.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, swaggerUIOptions)
);

export default server;
