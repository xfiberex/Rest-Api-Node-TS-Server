import express from "express";
import router from "./router";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import db from "./config/db";
import colors from "colors";

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

// Leer datos de formularios
server.use(express.json());

// Englobar metodos REST API desde router.ts
server.use("/api/products", router);

// Documentación de API's con Swagger
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions));

export default server;
