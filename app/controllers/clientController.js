import { ClientService } from "../services/clientService.js"
import createError from 'http-errors'
import createFakeClient from '../util/faker/createFakeClient.cjs'

class ClientController{

    clientService

    constructor(){
        this.clientService = new ClientService();
    }

    findAll = async (req, res, next) => {
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

    findOneByEmail = async (req, res, next) => {
        try{
            const { email } = req.query

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

    create = async (req, res, next) => {
        try{
            const clientData = req.body

            console.log(clientData)

            const client = await this.clientService.create(clientData);

            return res.status(200).json({client:client})

        }catch(error){
            next(error)
        }
        next()   
    }

    update = async (req, res, next) =>{

        try {

            const clientData = req.body
            const { email } = req.params

            const updatedClient = await this.clientService.update(clientData, email)

            if(updatedClient != null){
                res.status(200).json({updatedClient:updatedClient})
            }
            
        } catch (error) {
            next(error)
        }
    }

    delete = async (req, res, next) => {
        
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

    getFakeClient = async (req, res, next) => {

        res.json({fakeClient:createFakeClient()})

    }

}

export { ClientController }