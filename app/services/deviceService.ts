import createError from 'http-errors'
import { sqlize } from '../sequelize/sequelize';
import { v4 as uuid } from "uuid"
import createLogger from "../configs/logger";

const logger = createLogger('device-service')

class DeviceService {

    private models:any

    constructor(){
        this.models = sqlize.models
    }


}

export { DeviceService }