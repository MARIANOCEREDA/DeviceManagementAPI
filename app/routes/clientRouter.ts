import express from 'express'
import {ClientController} from '../controllers/clientController'
import { validatorHandler } from '../middlewares/validationHandler';
import { clientSchema } from '../joi/schemas/clientSchema';

const router = express.Router()

router.get('/', async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
    const controller = new ClientController();
    await controller.getAll(req, res, next);
})

router.get('/email', async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
    const controller = new ClientController();
    await controller.getOneByEmail(req, res, next);
})

router.post('/', async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
    const controller = new ClientController();
    await controller.createOne(req, res, next);
})


export default router;