import express from 'express'
import { UserController } from '../controllers/userController'
import passport from 'passport'

const router = express.Router()

router.get('/',
passport.authenticate("jwt", {session: false}),
async (request:express.Request, response:express.Response, next:express.NextFunction) =>{
    const controller = new UserController()
    await controller.listAll(request, response, next);
})



export default router;