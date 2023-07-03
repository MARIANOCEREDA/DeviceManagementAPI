import express from 'express'
import userRouter from './userRouter'
import clientRouter from './clientRouter'
import loginRouter from './loginRouter'
import signupRouter from './signupRouter'


function appRouter(app:express.Application){
    const router = express.Router()
    app.use('/api/v1', router)
    router.use('/user', userRouter)
    router.use('/client', clientRouter)
    router.use('/login', loginRouter)
    router.use('/signup', signupRouter)
}

export default appRouter;