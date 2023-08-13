import passport from 'passport'
import { JwtStrategy } from './jwtStrategy.js'

function setAuthenticationMethod(method, app){

    switch(method){

        case 'jwt':
            console.log("Authentication method set to: JWT")
            passport.initialize()
            passport.use(JwtStrategy)
            break;

        default:
            break;


    }

}

export { setAuthenticationMethod }

