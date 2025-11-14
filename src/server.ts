import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";

// Conectar a base de datos
async function connectDB() {
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
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const server = express();

// Leer datos de formularios
server.use(express.json());

// Englobar metodos REST API desde router.ts
server.use("/api/products", router);

// Probar URL con Supertest
server.get("/api", (req, res) => {
    res.json({ msg: "Desde api" });
});

export default server;
