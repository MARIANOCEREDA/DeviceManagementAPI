import createError from 'http-errors'
import { sqlize } from '../sequelize/sequelize.js';
import createLogger from '../configs/logger.js';
import { v4 as uuid } from 'uuid'

const logger = createLogger('device-service')

class DeviceService {

    constructor(){
        this.models = sqlize.models
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

    generateUUID() {
        return uuid()
    }

}

export { DeviceService }