import { Options, Sequelize } from "sequelize";
import { setUpModels } from "./models";

const USERNAME = encodeURIComponent(process.env.MYSQL_DB_USERNAME); //Enruteamos el usuario
const PASSWORD = encodeURIComponent(process.env.MYSQL_DB_PASSWORD); //enruteamos la contraseña

const port = process.env.MYSQL_DB_PORT
const host = process.env.MYSQL_DB_HOST
const dbName = process.env.MYSQL_DB_NAME

const URI = `mysql://${USERNAME}:${PASSWORD}@${host}:${port}/${dbName}`;

//const pool = new Pool({ connectionString:URI }); -> sequalize utiliza por detras pool

const options:Options = {
  dialect:"mysql",
  logging:false // Needs to be true in prod
}

const sqlize = new Sequelize(URI, options);

setUpModels(sqlize);

export { sqlize }