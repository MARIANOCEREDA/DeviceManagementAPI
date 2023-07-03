import mysql from 'mysql2/promise'
import connectionPool from '../db/mysql'
import crypto from 'crypto'
import { v4 as uuid } from 'uuid'
import createError from 'http-errors'
import { UserSignup } from '../interfaces/userSignup'
import { HashPasswordObject } from '../interfaces/hashPasswordObject'
import jwt from 'jsonwebtoken'
import config  from '../configs/config'


/**
 * @name UserService 
 * @type class
 * 
 * @brief Manages interaction with the Users table in MYSQL
 */

class UserService {

    private connection:mysql.Pool
    private dbName:string
    private dbTableName:string

    constructor(){
        this.connection = connectionPool
        this.dbName = process.env.MYSQL_DB_NAME!
        this.dbTableName = process.env.MYSQL_USERS_TABLENAME!
    }

    async create(userData:UserSignup) : Promise<any> {

        let connection:mysql.PoolConnection

        try{
            connection = await this.connection.getConnection()
        }catch(error){
            throw createError(500, "Not able to connect to the Database.")
        }

        const { salt, password } = this.hashPassword(userData.password);

        const query = `INSERT INTO ${this.dbName}.${this.dbTableName} (FirstName, LastName, Username, PhoneNumber, State, City,
                        Country, PasswordHash, UserId, Salt, Email, Age) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`
        
        let userId = this.generateUUID();

        let userFound = await this.getUserByUsername(userData.username)

        const dataToInsert = [
            userData.firstName,
            userData.lastName,
            userData.username,
            userData.phoneNumber,
            userData.state,
            userData.city,
            userData.country,
            password,
            userId,
            salt,
            userData.email,
            userData.age]

        if(userFound.length === 0){
            return await connection.execute(query, dataToInsert)
        }else{
            throw createError(409, "Username: " + userData.username + " already exists.")
        }
    }

    async getUserById(id:String) : Promise<Array<any>> {

        let connection:mysql.PoolConnection

        try{
            connection = await this.connection.getConnection()
        }catch(error){
            throw createError(500, "Not able to connect to the Database.")
        }

        const query = `SELECT UserId FROM ${this.dbName}.${this.dbTableName} WHERE UserId = ${id}`

        const [rows,] = await connection.execute(query) as any

        if (rows.length == 1) {
            return rows
        }else{
            return []
        }

    }

    async getUserByUsername(username:string) : Promise<Array<any>> {

        let connection:mysql.PoolConnection

        try{
            connection = await this.connection.getConnection()
        }catch(error){
            throw createError(500, "Not able to connect to the Database.")
        }

        const query = `SELECT Username FROM ${this.dbName}.${this.dbTableName} WHERE Username = '${username}'`

        const [rows,] = await connection.query(query) as any

        if (rows.length == 1) {
            return rows
        }else{
            return []
        }

    }

    async authenticate(username:string, password:string) : Promise<Object> {

        const user = await this.getUserByUsername(username)

        let connection:mysql.PoolConnection

        try{
            connection = await this.connection.getConnection()
        }catch(error){
            throw createError(500, "Not able to connect to the Database.")
        }

        if(user.length === 0){
            throw createError(404, "User not found")
        }else{
            const getDataQuery = `SELECT PasswordHash, Salt FROM ${this.dbName}.${this.dbTableName} WHERE Username = '${username}'`

            const [rows,] = await connection.query(getDataQuery) as any;

            const incomingHashedPassword = this.hashPasswordWithSalt(password, rows[0].Salt)

            if(incomingHashedPassword === rows[0].PasswordHash){

                const payload = { 
                    id: 1,
                    username: username,
                    iat: Date.now()
                };

                const token = jwt.sign(payload, config.key, { expiresIn:1440 })

                return { auth:true, token:token }

            }else{
                throw createError(401, "Username or password incorrect.")
            }

        }

    }

    async getToken(username:string) : Promise<any> {

        let connection:mysql.PoolConnection

        try{
            connection = await this.connection.getConnection()
        }catch(error){
            throw createError(500, "Not able to connect to the Database.")
        }

        const query = `SELECT Token FROM ${this.dbName}.${this.dbTableName} WHERE Username = '${username}'`

        const [result,] = await connection.query(query) as any

        if(result[0].Token){
            return result[0].Token
        }else{
            throw createError(401, "Token was not found.")
        }
    }

    async getAll(){

        let connection:mysql.PoolConnection

        try{
            connection = await this.connection.getConnection()
        }catch(error){
            throw createError(500, "Not able to connect to the Database.")
        }

        const query = `SELECT * FROM ${this.dbName}.${this.dbTableName}`

        const [result,] = await connection.query(query) as any
 
        return result
    }

    private generateUUID():string{
        return uuid()
    }

    private hashPassword(password:string) : HashPasswordObject {

        const salt = [uuid(), uuid()].join('_')

        const hash = crypto.createHash('sha256');

        hash.update([password, salt].join(''));

        const hashedValue = hash.digest('hex');

        return { salt:salt, password:hashedValue }
    }

    private hashPasswordWithSalt(password:string, salt:string) : string {

        const hash = crypto.createHash('sha256');

        hash.update([password, salt].join(''));

        const hashedValue = hash.digest('hex');

        return hashedValue
    }

}

export { UserService }