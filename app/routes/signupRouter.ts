import express from 'express'
import { validatorHandler } from '../middlewares/validationHandler';
import { signupSchema } from '../joi/schemas/signupSchema'
import { SignupController } from '../controllers/signupController';

const router = express.Router();

class SignupRouter {

    private router:express.Router
    private controller:SignupController

    constructor(){
        this.router = express.Router()
        this.controller = new SignupController()
    }

    start(){

        this.router.post('/',
        validatorHandler(signupSchema, 'body'),
        async(request:express.Request, response:express.Response, next:express.NextFunction) =>{
            await this.controller.createUser(request, response, next);
        });

        return this.router

    }

}



export { SignupRouter };