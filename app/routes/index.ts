import express from 'express'
import { UserRouter } from './userRouter'
import { ClientRouter} from './clientRouter'
import { LoginRouter } from './loginRouter'
import { SignupRouter } from './signupRouter'
import googleAuthRouter from './auth/googleAuthRouter'


function appRouter(app:express.Application){

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

function notAuthRoutes(app:express.Application){
    const router = express.Router()

    const loginRouter = new LoginRouter()
    const signupRouter = new SignupRouter()

    app.use('/api/v1', router)
    router.use('/login', loginRouter.start())
    router.use('/signup', signupRouter.start())
    router.use('/auth/google', googleAuthRouter)
}


export { appRouter, notAuthRoutes };