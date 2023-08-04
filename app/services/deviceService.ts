import createError from 'http-errors'
import { sqlize } from '../sequelize/sequelize';
import { Model } from 'sequelize';
import { v4 as uuid } from "uuid"
import createLogger from "../configs/logger";

const logger = createLogger('device-service')

class DeviceService {

    private models:any

    constructor(){
        this.models = sqlize.models
    }

    async create(device:any){

        const created = await this.models.Device.create(device)

        if(!created){
            throw createError(500, "Error when trying to create device.")
        }

        return created

    }

}

export { DeviceService }