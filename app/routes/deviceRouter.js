import express from 'express'
import { DeviceController } from '../controllers/deviceController.js';

class DeviceRouter{

    constructor(){
        this.controller = new DeviceController();
        this.router = express.Router()
    }

    start(){

        return this.router
    }

}

export default DeviceRouter