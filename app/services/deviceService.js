import createError from 'http-errors'
import { sqlize } from '../sequelize/sequelize.js';
import createLogger from '../configs/logger.js';
import { v4 as uuid } from 'uuid'
import { UserService } from './userService.js';

const logger = createLogger('device-service')

class DeviceService {

    constructor(){
        this.models = sqlize.models
        this.userService = new UserService()
    }

    async create(device){

        logger.debug("Incomming device data: " + device)

        const user = await this.models.User.findOne({
            where:{ Username:device.Username }
        })

        logger.debug("User found: " + user)

        if(!user){
            throw createError(404, "User not found.")
        }

        const deviceData = {
            name:device.Name,
            deviceId:this.generateUUID(),
            userId:user.id
        }

        const created = await this.models.Device.create(deviceData)

        if(!created){
            throw createError(500, "Error when trying to create device.")
        }

        return created

    }

    async findAll(username){

        const user = await this.userService.getUserByUsername(username)

        const devices = await this.models.Device.findAll({
            where:{userId:user.id}
        })

        if( devices == null){
            throw createError(500, 'Not able to connect to database')
        }

        return devices

    }

    async findById(username, id){

        const user = await this.userService.getUserByUsername(username)

        const device = await this.models.Device.findOne({
            where:{
                deviceId:id,
                userId:user.id
            }
        })

        if(!device){
            throw createError(404, "Device not found.") 
        }

        if(device == null){
            throw createError(500, 'Not able to connect to database')
        }

        return device

    }

    async findByName(username, name){

        const user = await this.userService.getUserByUsername(username)

        const device = await this.models.Device.findOne({
            where:{
                name:name,
                userId:user.id
            }
        })

        if(!device){
            throw createError(404, "Device not found.") 
        }

        if(device == null){
            throw createError(500, 'Not able to connect to database')
        }

        return device

    }

    generateUUID() {
        return uuid()
    }

}

export { DeviceService }