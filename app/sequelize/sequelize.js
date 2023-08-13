import dotenv from 'dotenv';
import { Sequelize } from "sequelize";
import config from '../configs/index.js';
import { setUpModels } from './models/index.js';
dotenv.config();

const USERNAME = encodeURIComponent(config.mysql.dbUsername); //Enruteamos el usuario
const PASSWORD = encodeURIComponent(config.mysql.dbPassword); //enruteamos la contraseña

const port = config.mysql.port
const host = config.mysql.dbHost
const dbName = config.mysql.dbName

const URI = `mysql://${USERNAME}:${PASSWORD}@${host}:${port}/${dbName}`;

console.log(config.mysql.dbPassword)

//const pool = new Pool({ connectionString:URI }); -> sequalize utiliza por detras pool

const options = {
    dialect:"mysql",
    logging:false // Needs to be true in prod
}

const sqlize = new Sequelize(URI, options);

setUpModels(sqlize);

export { sqlize }