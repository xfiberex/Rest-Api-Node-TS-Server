import server from "./server";
import colors from "colors";
import dotenv from "dotenv";
import { validateEnv, checkOptionalEnv } from "./config/validateEnv";
import { scheduleDailyCleanup, checkAndCleanOnStartup } from "./utils/databaseScheduler";

// Cargar variables de entorno
dotenv.config();

// Validar variables de entorno antes de iniciar el servidor
try {
    validateEnv();
    checkOptionalEnv();
} catch (error) {
    console.error(colors.red.bold("Error al validar variables de entorno:"), error);
    process.exit(1);
}

const port = process.env.PORT || 3000;

// Manejo de errores no capturados
process.on("uncaughtException", (error: Error) => {
    console.error(colors.red.bold("Error no capturado:"), error);
    console.error(colors.red("El servidor se cerrará..."));
    process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
    console.error(colors.red.bold("Promesa rechazada no manejada:"), reason);
    console.error(colors.red("El servidor se cerrará..."));
    process.exit(1);
});

const serverInstance = server.listen(port, async () => {
    console.log(colors.cyan.bold(`Rest API en el puerto ${port}`));
    console.log(colors.cyan(`Entorno: ${process.env.NODE_ENV || "development"}`));
    console.log(colors.cyan(`Documentación disponible en: http://localhost:${port}/docs`));
    
    // Verificar estado de la base de datos al iniciar
    await checkAndCleanOnStartup();
    
    // Programar limpieza automática diaria
    scheduleDailyCleanup();
});

// Manejo de cierre graceful
process.on("SIGTERM", () => {
    console.log(colors.yellow.bold("SIGTERM recibido. Cerrando servidor..."));
    serverInstance.close(() => {
        console.log(colors.yellow("Servidor cerrado correctamente"));
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    console.log(colors.yellow.bold("\nSIGINT recibido. Cerrando servidor..."));
    serverInstance.close(() => {
        console.log(colors.yellow("Servidor cerrado correctamente"));
        process.exit(0);
    });
});
