import express from 'express'
import { ClientService } from "../services/clientService"
import createError from 'http-errors'
import debug from 'debug'

constlog: debug('app:client-service');

class ClientController{

    clientService:ClientService

    constructor(){
        this.clientService = new ClientService();
    }

    async getAll(req:express.Request, res:express.Response, next:express.NextFunction){
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

    async createOne(req:express.Request, res:express.Response, next:express.NextFunction){
        try{
            const clientData:any = req.body

            console.log(clientData)

            const client:any = await this.clientService.createOne(clientData);

            return res.status(200).json({client:client})

        }catch(error){
            next(error)
        }
        next()   
    }

    async getOneByEmail(req:express.Request, res:express.Response, next:express.NextFunction){
        try{
            const { email }:any = req.query

            const client = await this.clientService.findOneByEmail(email);

            if (client.length == 0){
                throw createError(404, "Client not found.")
            }
            else{
                return res.status(200).json({client:client})
            }
            
        }catch(error){
            next(error)
        }
        next()   
    }


}

export { ClientController }