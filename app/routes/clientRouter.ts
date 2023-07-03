import express from 'express'
import {ClientController} from '../controllers/clientController'
import { validatorHandler } from '../middlewares/validationHandler';
import { clientSchema } from '../joi/schemas/clientSchema';

const router = express.Router()
const controller = new ClientController();

router.get('/', async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
    await controller.listAll(req, res, next);
})

router.get('/:id', async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
    await controller.listOne(req, res, next);
})

router.post('/',
validatorHandler(clientSchema, 'body'),
async (req:express.Request, res:express.Response, next:express.NextFunction)  =>{
    await controller.create(req, res, next);
})

export default router;