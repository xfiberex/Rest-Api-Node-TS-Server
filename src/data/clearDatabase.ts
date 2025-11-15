import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
    try {
        await db.sync({ force: true });
        console.log("Datos eliminados correctamente");
        exit(0); // 0 Termino sin errores
    } catch (error) {
        console.log(error);
        exit(1); // 1 Termino con errores
    }
};

export default clearDB;

// Definir codigo para la terminar en una posición del CLI
// Agregar "pretest" en el package JSON para que limpier la BD antes del test
if (require.main === module) {
    if (process.argv[2] === "--clear") {
        clearDB();
    }
}