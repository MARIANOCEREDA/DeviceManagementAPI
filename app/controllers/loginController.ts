import express from 'express'
import { UserService } from '../services/userService';
import { UserLogin } from '../interfaces/userLogin';

class LoginController{

    private service:UserService

    constructor(){
        this.service = new UserService();
    }

    async login(request:express.Request, response:express.Response, next:express.NextFunction){

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