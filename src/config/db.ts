import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

// Determinar la URL de base de datos según el entorno
const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = isProduction ? process.env.DATABASE_URL! : process.env.DATABASE_URL_TEST!;

// Configuración de la base de datos
const db = new Sequelize(databaseUrl, {
    models: [__dirname + "./../models/**/*"],
    logging: false,
    ...(isProduction && {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
});

export default db;
