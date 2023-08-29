import express from 'express'
import { DeviceController } from '../controllers/deviceController.js';
import { deviceSchema } from '../joi/schemas/deviceSchema.js';
import { validatorHandler } from '../middlewares/validationHandler.js';
import passport from 'passport'

class DeviceRouter{

    constructor(){
        this.controller = new DeviceController();
        this.router = express.Router()
    }

    start(){

        this.router.post('/',
                        validatorHandler(deviceSchema, 'body'),
                        this.controller.create)
        
        this.router.get('/:username',
                        passport.authenticate("jwt", {session: false}),
                        this.controller.findAll)
        
        this.router.get('/:username',
                        passport.authenticate("jwt", {session: false}),
                        this.controller.findOneByName)

        return this.router
    }

}

export { DeviceRouter }