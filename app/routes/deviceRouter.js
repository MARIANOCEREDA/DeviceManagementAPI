import express from 'express'
import { DeviceController } from '../controllers/deviceController.js';
import { deviceSchema } from '../joi/schemas/deviceSchema.js';
import { validatorHandler } from '../middlewares/validationHandler.js';

class DeviceRouter{

    constructor(){
        this.controller = new DeviceController();
        this.router = express.Router()
    }

    start(){

        this.router.post('/',
                        validatorHandler(deviceSchema, 'body'),
                        this.controller.create)

        return this.router
    }

}

export { DeviceRouter }