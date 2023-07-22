import express from 'express'
import { validatorHandler } from '../middlewares/validationHandler';
import { loginSchema } from '../joi/schemas/loginSchema';
import { LoginController } from '../controllers/loginController';

class LoginRouter{

    private router:express.Router
    private controller:LoginController

    constructor(){
        this.router = express.Router()
        this.controller = new LoginController()
    }

    start(){

        this.router.post('/', 
        validatorHandler(loginSchema, 'body'),
        async(request:express.Request, response:express.Response, next:express.NextFunction)=>{
            await this.controller.login(request, response, next);
        });

        return this.router

    }

}




export { LoginRouter }