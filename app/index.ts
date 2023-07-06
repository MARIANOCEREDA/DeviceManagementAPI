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
import AuthHandler from './middlewares/authHandler'

const app = express()

app.use(express.json())

app.set('key', config)

// Middleware for logging : https://www.npmjs.com/package/morgan 
app.use(morgan('combined'))

// Middleware to enable access from different routes: https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/ 
//app.use(cors(corsOptions))

//Auth 
require('./auth')

// Set routes middleware.
appRouter(app)

// Log Error middlewares
app.use(logErrors)

// Error middleware
app.use(errorHandler)


app.listen(process.env.SERVER_PORT, ()=>{
    console.log("Server listening to port: " + process.env.SERVER_PORT);
})
