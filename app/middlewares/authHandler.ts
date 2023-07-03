import express from 'express'
import { UserService } from '../services/userService'
import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import config from '../configs/config'

async function AuthHandler (request:express.Request, response:express.Response, next:express.NextFunction){

    const token:any = request.headers['access-token']

    if (token === undefined) {
        next(createError(createError(401, "Not token was given.")))
    }

    try{
        jwt.verify(token, config.key)
        next()
    }catch(error){
        next(createError(401, "Token is not valid."))
    }

}

export default AuthHandler;