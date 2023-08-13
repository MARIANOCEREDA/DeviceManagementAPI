import express from 'express'
import { UserRouter } from './userRouter.js'
import { ClientRouter} from './clientRouter.js'
import { LoginRouter } from './loginRouter.js'
import { SignupRouter } from './signupRouter.js'
import googleAuthRouter from './auth/googleAuthRouter.js'


function appRouter(app){

    const clientRouter = new ClientRouter()
    const userRouter = new UserRouter()

    const routerHelper = express.Router()
    app.use('/helpers', routerHelper)
    routerHelper.use('/client', clientRouter.startHelpers())

    const router = express.Router()

    app.use('/api/v1', router)
    router.use('/user', userRouter.start())
    router.use('/client', clientRouter.start())
}

function notAuthRoutes(app){
    const router = express.Router()

    const loginRouter = new LoginRouter()
    const signupRouter = new SignupRouter()

    app.use('/api/v1', router)
    router.use('/login', loginRouter.start())
    router.use('/signup', signupRouter.start())
    router.use('/auth/google', googleAuthRouter)
}


export { appRouter, notAuthRoutes };