import express from 'express'
import userRouter from './userRouter'
import clientRouter from './clientRouter'
import loginRouter from './loginRouter'
import signupRouter from './signupRouter'
import googleAuthRouter from './auth/googleAuthRouter'


function appRouter(app:express.Application){
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/user', userRouter)
    router.use('/client', clientRouter)
}

function notAuthRoutes(app:express.Application){
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/login', loginRouter)
    router.use('/signup', signupRouter)
    router.use('/auth/google', googleAuthRouter)
}


export { appRouter, notAuthRoutes };