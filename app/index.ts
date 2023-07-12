import argv from './util/arg_parser'
import dotenv from 'dotenv'

// Always import dotenv first
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import corsOptions from './util/cors_config'
import config from './configs/config'
import appRouter from './routes'
import { errorHandler, logErrors } from './middlewares/errorHandler'
import cookieParser from 'cookie-parser'



const app = express()

app.use(express.json())

app.set('key', config)

// Middleware for logging : https://www.npmjs.com/package/morgan 
app.use(morgan('combined'))

// Middleware to enable access from different routes: https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/ 
//app.use(cors(corsOptions))

switch(argv.auth){
    case 'jwt':
        console.log("Authentication method set to: JWT")
        require('./auth');
        break;
    
    case 'cookies':
        console.log("Authentication method set to: Cookies")
        app.use(cookieParser())
        break;
    
    default:
        console.log("Not auth method specifies, set by default to : json web token (jwt)");
        require('./auth')
        break;
}


appRouter(app)

// Errr middlewares
app.use(logErrors)
app.use(errorHandler)


app.listen(argv.port, ()=>{
    console.log("Server listening to port: " + argv.port);
})
