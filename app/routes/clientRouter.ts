import express from 'express'
import { ClientController } from '../controllers/clientController'
import { validatorHandler } from '../middlewares/validationHandler';
import { clientSchema } from '../joi/schemas/clientSchema';


class ClientRouter{

    private router:express.Router
    private controller:ClientController

    constructor(){
        this.controller = new ClientController();
        this.router = express.Router()
    }

    start(){

        this.router.get('/', this.controller.findAll)
        
        this.router.get('/email', this.controller.findOneByEmail)
        
        this.router.post(
            '/',
            validatorHandler(clientSchema, 'body'),
            this.controller.create)

        this.router.put('/:email', this.controller.update)

        this.router.delete('/:email', this.controller.delete)

        return this.router
    }

}

export {ClientRouter};