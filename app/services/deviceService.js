import createError from 'http-errors'
import { sqlize } from '../sequelize/sequelize.js';
import createLogger from '../configs/logger.js';

const logger = createLogger('device-service')

class DeviceService {

    constructor(){
        this.models = sqlize.models
    }

    async create(device){

        const created = await this.models.Device.create(device)

        if(!created){
            throw createError(500, "Error when trying to create device.")
        }

        return created

    }

}

export { DeviceService }