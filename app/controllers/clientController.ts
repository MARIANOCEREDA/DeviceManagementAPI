import express from 'express'
import { ClientService } from "../services/clientService"
import createError from 'http-errors'
import createFakeClient from '../util/faker/createFakeClient'

class ClientController{

    clientService:ClientService

    constructor(){
        this.clientService = new ClientService();
    }

    findAll = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
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

    findOneByEmail = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
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

    create = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        try{
            const clientData:any = req.body

            console.log(clientData)

            const client:any = await this.clientService.create(clientData);

            return res.status(200).json({client:client})

        }catch(error){
            next(error)
        }
        next()   
    }

    update = async (req:express.Request, res:express.Response, next:express.NextFunction) =>{

        try {

            const clientData:any = req.body
            const { email } = req.params

            const updatedClient = await this.clientService.update(clientData, email)

            if(updatedClient != null){
                res.status(200).json({updatedClient:updatedClient})
            }
            
        } catch (error) {
            next(error)
        }
    }

    delete = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        
        try {

            const { email } = req.params

            const deletedClient = await this.clientService.delete(email)

            if(deletedClient != null){
                res.status(200).json({deletedClient:deletedClient})
            }
            
        } catch (error) {
            next(error)
        }

    }

    getFakeClient = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

        res.json({fakeClient:createFakeClient()})

    }

}

export { ClientController }