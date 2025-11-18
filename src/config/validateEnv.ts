import colors from "colors";

// Variables de entorno requeridas
const requiredEnvVars = [
    "DATABASE_URL",
    "FRONTEND_URL",
    "PORT",
    "NODE_ENV"
];

// Variables opcionales para testing
const optionalEnvVars = [
    "DATABASE_URL_TEST"
];

/**
 * Valida que todas las variables de entorno requeridas estén presentes
 * @throws {Error} Si falta alguna variable de entorno requerida
 */
export const validateEnv = (): void => {
    const missingVars: string[] = [];

    // Verificar variables requeridas
    requiredEnvVars.forEach((varName) => {
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    });

    // Si estamos en modo test, verificar DATABASE_URL_TEST
    if (process.env.NODE_ENV === "test" && !process.env.DATABASE_URL_TEST) {
        missingVars.push("DATABASE_URL_TEST");
    }

    // Si faltan variables, lanzar error
    if (missingVars.length > 0) {
        console.error(
            colors.red.bold(
                `Error: Faltan las siguientes variables de entorno requeridas:`
            )
        );
        missingVars.forEach((varName) => {
            console.error(colors.red(`  - ${varName}`));
        });
        console.error(
            colors.yellow(
                `\nPor favor, crea un archivo .env basándote en .env.example`
            )
        );
        throw new Error("Configuración de entorno incompleta");
    }

    // Validar NODE_ENV
    const validNodeEnvs = ["development", "production", "test"];
    if (!validNodeEnvs.includes(process.env.NODE_ENV!)) {
        console.warn(
            colors.yellow(
                `Advertencia: NODE_ENV debe ser 'development', 'production' o 'test'. Valor actual: ${process.env.NODE_ENV}`
            )
        );
    }

    // Validar que PORT sea un número
    const port = parseInt(process.env.PORT!, 10);
    if (isNaN(port) || port < 0 || port > 65535) {
        throw new Error(
            `PORT debe ser un número válido entre 0 y 65535. Valor actual: ${process.env.PORT}`
        );
    }

    // Log de confirmación en desarrollo
    if (process.env.NODE_ENV === "development") {
        console.log(colors.green.bold("✓ Variables de entorno validadas correctamente"));
    }
};

/**
 * Muestra advertencias para variables opcionales que no están configuradas
 */
export const checkOptionalEnv = (): void => {
    if (process.env.NODE_ENV === "development") {
        optionalEnvVars.forEach((varName) => {
            if (!process.env[varName]) {
                console.warn(
                    colors.yellow(
                        `Advertencia: Variable opcional ${varName} no configurada`
                    )
                );
            }
        });
    }
};
