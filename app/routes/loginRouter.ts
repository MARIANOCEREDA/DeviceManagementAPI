import express from 'express'
import { validatorHandler } from '../middlewares/validationHandler';
import { loginSchema } from '../joi/schemas/loginSchema';
import { LoginController } from '../controllers/loginController';
import passport from 'passport';

const router = express.Router();

router.post('/', 
validatorHandler(loginSchema, 'body'),
async(request:express.Request, response:express.Response, next:express.NextFunction)=>{
    const controller = new LoginController();
    await controller.login(request, response, next);
});


export default router;