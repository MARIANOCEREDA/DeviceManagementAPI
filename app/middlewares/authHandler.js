import createError from 'http-errors'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import config from '../configs/index.js'
 
async function AuthHandler (request, response, next){

    const token = request.headers['access-token']

    if (token === undefined) {
        next(createError(createError(401, "Not token was given.")))
    }

    try{
        jwt.verify(token, config.jwt.key)
        next()

    }catch(error){
        
        if(error instanceof TokenExpiredError){
            next(createError(401, "Token is expired."))
        }else{
            next(createError(401, "Token is not valid."))
        }
    }

}

export default AuthHandler;