import express from 'express'
import { validatorHandler } from '../middlewares/validationHandler.js';
import { signupSchema } from '../joi/schemas/signupSchema.js'
import { SignupController } from '../controllers/signupController.js';

const router = express.Router();

class SignupRouter {

    constructor(){
        this.router = express.Router()
        this.controller = new SignupController()
    }

    start(){

        this.router.post('/',
        validatorHandler(signupSchema, 'body'),
        async(request, response, next) =>{
            await this.controller.createUser(request, response, next);
        });

        return this.router

    }

}



export { SignupRouter };