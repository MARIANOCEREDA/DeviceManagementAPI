import express from 'express'
import { validatorHandler } from '../middlewares/validationHandler.js';
import { loginSchema } from '../joi/schemas/loginSchema.js';
import { LoginController } from '../controllers/loginController.js';

class LoginRouter{

    constructor(){
        this.router = express.Router()
        this.controller = new LoginController()
    }

    start(){

        this.router.post('/', 
        validatorHandler(loginSchema, 'body'),
        async(request, response, next)=>{
            await this.controller.login(request, response, next);
        });

        return this.router

    }

}




export { LoginRouter }