import express from 'express'
import { UserController } from '../controllers/userController.js'
import passport from 'passport'

class UserRouter {

    constructor(){
        this.controller = new UserController();
        this.router = express.Router()
    }

    start(){

        this.router.get('/',
            passport.authenticate("jwt", {session: false}),
            this.controller.findAll
        )

        this.router.patch('/',
            passport.authenticate("jwt", {session: false}),
            this.controller.update
        )

        return this.router
    }
}


export { UserRouter };