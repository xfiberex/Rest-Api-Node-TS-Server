import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

// Base de datos de producción PostgreSQL
// const db = new Sequelize(process.env.DATABASE_URL!, {
//     dialectOptions: {
//         ssl: {
//             require: false,
//         },
//     },
//     models: [__dirname + "./../models/**/*.ts"],
//     logging: false,
// });

// Base de datos de desarrollo PostgreSQL
const db = new Sequelize(process.env.DATABASE_URL_TEST!, {
    models: [__dirname + "./../models/**/*.ts"],
    logging: false,
});

export default db;
