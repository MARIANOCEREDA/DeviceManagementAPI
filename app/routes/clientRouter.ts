import express from 'express'
import {ClientController} from '../controllers/clientController'
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

        this.router.get('/', async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
            await this.controller.getAll(req, res, next);
        })
        
        this.router.get('/email', async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
            await this.controller.getOneByEmail(req, res, next);
        })
        
        this.router.post('/', async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
            await this.controller.createOne(req, res, next);
        })

        return this.router
    }

}

export {ClientRouter};