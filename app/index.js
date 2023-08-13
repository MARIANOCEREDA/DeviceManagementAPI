import displayOptions from './util/arg_parser.js'

// Always import dotenv first
import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import morgan from 'morgan'
import config from './configs/index.js'
import { appRouter, notAuthRoutes } from './routes/index.js'
import { errorHandler, logErrors } from './middlewares/errorHandler.js'
import { setAuthenticationMethod } from './auth/index.js'

const app = express()

let { port , auth } = displayOptions()

app.use(express.json())

app.set('key', config.jwt.key)

// Middleware for logging : https://www.npmjs.com/package/morgan
app.use(morgan('combined'))

// Middleware to enable access from different routes: https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/ 
//app.use(cors(corsOptions))

// Rest of the routes wich can only be accessed with login
setAuthenticationMethod(auth, app)

// Login section
notAuthRoutes(app)

// Access to the rest of routes
appRouter(app)

// Error middlewares
app.use(logErrors)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log("Server listening to port: " + port);
})
