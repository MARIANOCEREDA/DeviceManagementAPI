import passport from 'passport'
import { JwtStrategy } from './jwtStrategy'
import { CustomGoogleStrategy } from './googleStrategy'
import express from 'express'
import session from 'express-session'

function setAuthenticationMethod(method:string, app:express.Application){

    switch(method){

        case 'jwt':
            console.log("Authentication method set to: JWT")
            passport.initialize()
            passport.use(JwtStrategy)
            break;
        
        case 'google':
            console.log("Authentication method set to: GOOGLE")
            passport.initialize()
            passport.use('google', CustomGoogleStrategy);

        default:
            break;


    }

}

export { setAuthenticationMethod }

