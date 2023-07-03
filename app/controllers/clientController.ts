import express from 'express'
import { ClientService } from "../services/clientService"

class ClientController{

    clientService:ClientService

    constructor(){
        this.clientService = new ClientService();
    }

    async create(req:express.Request, res:express.Response, next:express.NextFunction){
        try {
            const body = req.body;
            console.log(body)
            const created = await this.clientService.createOne(body)
            res.status(200).json({createdUser:body})
        } catch (error) {
            next(error);
        }
    }

    async listAll(req:express.Request, res:express.Response, next:express.NextFunction){
        try{
            const clients = await this.clientService.find();
            /* 200 “OK” – La respuesta para una solicitud HTTP exitosa. El resultado dependerá del tipo de solicitud. 
            https://www.siteground.es/kb/codigos-error-http-explicados/?gclid=CjwKCAjw-b-kBhB-EiwA4fvKrHLqJeU4aro_otXfwnSfCyBdfc9JCYSlJPX1WSBp7J4V85BAXkZ7rxoCNrkQAvD_BwE
            */
            return res.status(200).json({clients:clients})
        }catch(error){
            next(error)
        }
        next()   
    }

    async update(req:express.Request, res:express.Response, next:express.NextFunction){
    }

    async listOne(req:express.Request, res:express.Response, next:express.NextFunction){
    }


}

export { ClientController }