import express from 'express'
import { ClientController } from '../controllers/clientController.js'
import { validatorHandler } from '../middlewares/validationHandler.js';
import { clientSchema } from '../joi/schemas/clientSchema.js';


class ClientRouter{

    constructor(){
        this.controller = new ClientController();
        this.router = express.Router()
    }

    start(){

        this.router.get('/',this.controller.findAll)
        
        this.router.get('/email', this.controller.findOneByEmail)
        
        this.router.post(
            '/',
            validatorHandler(clientSchema, 'body'),
            this.controller.create)

        this.router.put('/:email', this.controller.update)

        this.router.delete('/:email', this.controller.delete)

        return this.router
    }

    startHelpers(){

        this.router.get('/fakeClient', this.controller.getFakeClient)

        return this.router
    }

}

export {ClientRouter};