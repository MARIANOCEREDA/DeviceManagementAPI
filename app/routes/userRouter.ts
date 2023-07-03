import express from 'express'
import { userSchema } from '../joi/schemas/userSchema'
import { validatorHandler } from '../middlewares/validationHandler'
import AuthHandler from '../middlewares/authHandler'
import { UserController } from '../controllers/userController'

const router = express.Router()

router.get('/',
AuthHandler,
async (request:express.Request, response:express.Response, next:express.NextFunction) =>{
    const controller = new UserController()
    await controller.listAll(request, response, next);
})

export default router;