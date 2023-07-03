import express from 'express'
import { UserService } from "../services/userService"

class UserController {

    service:UserService

    constructor(){
        this.service = new UserService()
    }

    async listAll(req:express.Request, res:express.Response, next:express.NextFunction){
        try{

            const users:any = await this.service.getAll();

            return res.status(200).json({users:users})

        }catch(error){
            next(error)
        }
        next()   
    }

    async update(req:express.Request, res:express.Response, next:express.NextFunction){
    }

    async listOne(req:express.Request, res:express.Response, next:express.NextFunction){
    }


}

export { UserController }