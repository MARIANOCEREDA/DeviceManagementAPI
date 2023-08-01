import { sqlize } from '../sequelize/sequelize'
import crypto from 'crypto'
import { v4 as uuid } from 'uuid'
import createError from 'http-errors'
import { UserSignup } from '../interfaces/userSignup'
import { HashPasswordObject } from '../interfaces/hashPasswordObject'
import jwt from 'jsonwebtoken'
import config from '../configs'

/**
 * @name UserService 
 * @type class
 * 
 * @brief Manages interaction with the Users table in MYSQL
 */

class UserService {

    private models:any

    constructor(){
        this.models = sqlize.models
    }

    async create(userData:UserSignup) : Promise<any> {

        const { salt, password } = this.hashPassword(userData.password);
        
        let userId = this.generateUUID();

        let userFound = await this.getUserByUsername(userData.username)

        const dataToInsert = {
            ...userData,
            passwordHash:password,
            userId:userId,
            salt:salt,
        }

        try{
            const userInserted = await this.models.User.create(dataToInsert)
            return userInserted

        }catch(error){
            throw createError(409, "Username: " + userData.username + " already exists.")
        }
    }

    async getUserById(id:String) : Promise<Array<any>> {

        const user = await this.models.User.findByPk(id)

        if (!user) {
            throw createError(500, "Not able to connect to the Database.")
        }

        delete user.dataValues.Password
        delete user.dataValues.PasswordHash

        return user

    }

    async getUserByUsername(username:string) : Promise<Array<any>> {

        const user = await this.models.User.findOne({
            where:{ username }
        })

        if (!user) {
            throw createError(500, "Not able to connect to the Database.")
        }

        delete user.dataValues.Password
        delete user.dataValues.PasswordHash

        return user

    }

    async authenticate(username:string, password:string) : Promise<Object> {

        const user = await this.getUserByUsername(username)

        if(!user){
            throw createError(404, "User not found.")

        }else{

            const userAuthData = await this.models.User.findOne({
                attributes:["PasswordHash", "Salt", "UserId"],
                where:{ Username:username }
            })

            const incomingHashedPassword = this.hashPasswordWithSalt(password, userAuthData.dataValues.Salt)

            if(incomingHashedPassword === userAuthData.dataValues.PasswordHash){

                const payload = { 
                    sub:userAuthData.dataValues.UserId,
                    username: username,
                    iat: Date.now()
                };

                const token = jwt.sign(payload, config.jwt.key, { expiresIn:1440 })

                return { auth:true, token:token }

            }else{
                throw createError(401, "Username or password incorrect.")
            }
        }
    }

    async getToken(username:string) : Promise<any> {

        try{

            const token = await this.models.User.findOne({
                attributes:["Token"],
                where:{ Username:username }
            })

            return token

        }catch(error){
            throw createError(401, "Token was not found.")

        }
    }

    async getAll() : Promise<any> {

        try {
            const users = await this.models.User.findAll({
                attributes: ['Username', 'Email', 'FirstName', 'LastName', 'City', 'PhoneNumber'],
            });

            if (users.length === 0) {
                throw createError(404, "Users not found.")
            } else {
                return users
            }

        } catch (error) {
            throw createError(401, "Error when trying to fetch users.")
        }
    }

    async update(userNewData:any): Promise<any> {

        try {
            
            const userExists = await this.getUserByUsername(userNewData.username)

            if(userExists){

                const updatedUser = await this.models.User.update(
                    userNewData,
                    {where: { username:userNewData.username }}
                );

                if (updatedUser){
                    return userNewData
                }

            }else{
                return null
            }

        } catch (error) {
            throw error
            // throw createError(401, "Error when trying to fetch users.")
        }

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