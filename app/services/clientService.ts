import { Connection } from "../db/mongo"
import createError from 'http-errors'
import { ClientModel } from "../models/mongoose/clientSchema";
import { v4 as uuid } from "uuid"
import createLogger from "../configs/logger";

const log = createLogger('client-service')

class ClientService {

    constructor(){
        new Connection().connect();
    }

    async find(): Promise<any> {

        const clients = await ClientModel.find()

        if(!clients){
            throw createError(404, 'Clients not found')
        }

        if(clients === null){
            throw createError(500, 'Not able to connect to database')
        }

        return clients
    }

    async findOneByEmail(email:string): Promise<any> {

        const client = await ClientModel.findOne({"email":email})

        if(!client){
            return null
        }

        if(client === null){
            throw createError(500, 'Not able to connect to database')
        }

        return client

    }

    async createOne(clientData:any) : Promise<any> {

        clientData["id"] = uuid()

        const client = await this.findOneByEmail(clientData["email"])

        log.debug(client)

        if (client != null){
            throw createError(401, `User with email ${clientData["email"]} already exists`)
        }

        const newClient = new ClientModel(clientData)

        try{
            const created = await newClient.save()

            log.debug("Created client result: " + created)

            return created

        }catch(error){
            throw createError(500, "Not able to create User")
        }

    }

}

export { ClientService }