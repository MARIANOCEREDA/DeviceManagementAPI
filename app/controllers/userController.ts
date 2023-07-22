import express from 'express'
import { UserService } from "../services/userService"

class UserController {

    service:UserService

    constructor(){
        this.service = new UserService()
    }

    findAll = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        try{

            const users:any = await this.service.getAll();

            return res.status(200).json({users:users})

        }catch(error){
            next(error)
        }
        next()   
    }

    update = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

        try {

            const userNewData = req.body 

            const updatedUser:any = await this.service.update(userNewData)

            if(updatedUser){
                return res.status(200).json({userUpdated:updatedUser})
            }
            
        } catch (error) {
            next(error)
        }


    }

    findOne = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    }


}

export { UserController }