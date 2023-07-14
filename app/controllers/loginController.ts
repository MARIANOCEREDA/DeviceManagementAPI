import express from 'express'
import { UserService } from '../services/userService';
import { UserLogin } from '../interfaces/userLogin';
import jwt from 'jsonwebtoken'
import config  from '../configs/config'

class LoginController{

    private service:UserService

    constructor(){
        this.service = new UserService();
    }

    async login(request:express.Request, response:express.Response, next:express.NextFunction){

       //response.json(request.user.toAuthJSON())

        try {
            
            const loginData:UserLogin = request.body;

            const result:any = await this.service.authenticate(loginData.username, loginData.password)

            if(result.auth){
                response.json({token:result.token})
            }

        } catch (error) {
            next(error);
        }
    }

}

export { LoginController }