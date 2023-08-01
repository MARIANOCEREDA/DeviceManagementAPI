import express from 'express'
import { validatorHandler } from '../middlewares/validationHandler';
import { DeviceController } from '../controllers/deviceController';

class DeviceRouter{

    private router:express.Router
    private controller:DeviceController

    constructor(){
        this.controller = new DeviceController();
        this.router = express.Router()
    }

    start(){


        return this.router
    }

    
}