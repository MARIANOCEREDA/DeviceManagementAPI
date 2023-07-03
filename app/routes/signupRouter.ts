import express from 'express'
import { validatorHandler } from '../middlewares/validationHandler';
import { signupSchema } from '../joi/schemas/signupSchema'
import { SignupController } from '../controllers/signupController';

const router = express.Router();

router.post('/',
validatorHandler(signupSchema, 'body'),
async(request:express.Request, response:express.Response, next:express.NextFunction) =>{
    const controller = new SignupController();
    await controller.createUser(request, response, next);
});

export default router;