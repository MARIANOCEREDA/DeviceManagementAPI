import { Options, Sequelize } from "sequelize";
import config from "../configs";
import { setUpModels } from "./models";

const USERNAME = encodeURIComponent(config.mysql.dbUsername); //Enruteamos el usuario
const PASSWORD = encodeURIComponent(config.mysql.dbPassword); //enruteamos la contraseña

const port = config.mysql.port
const host = config.mysql.dbHost
const dbName = config.mysql.dbName

const URI = `mysql://${USERNAME}:${PASSWORD}@${host}:${port}/${dbName}`;

//const pool = new Pool({ connectionString:URI }); -> sequalize utiliza por detras pool

const options:Options = {
    dialect:"mysql",
    logging:false // Needs to be true in prod
}

const sqlize = new Sequelize(URI, options);

setUpModels(sqlize);

export { sqlize }