import mysql from 'mysql2/promise'
import express from 'express'
import { UserService } from '../services/userService'
import { UserSignup } from '../interfaces/userSignup'

class SignupController{

    private service:UserService

    constructor(){
        this.service = new UserService();
    }

    async createUser(request:express.Request, response:express.Response, next:express.NextFunction){
        try {

            const signupData:UserSignup = request.body;

            const result = await this.service.create(signupData)

            if(result){
                response.json({CreatedUser:signupData});
            }
            
        } catch (error) {
            next(error);
        }
    }

}

export { SignupController }