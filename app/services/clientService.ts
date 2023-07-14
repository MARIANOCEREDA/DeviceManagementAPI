import { Connection } from "../db/mongo"
import createError from 'http-errors'
import { ClientModel } from "../schemas/mongoose/clientSchema";
import { v4 as uuid } from "uuid"

class ClientService{

    constructor(){
        new Connection().connect();
    }

    async find(){

        const clients = await ClientModel.find()

        if(!clients){
            throw createError(404, 'Clients not found')
        }

        if(clients === null){
            throw createError(500, 'Not able to connect to database')
        }

        return clients
    }

    async findOneByEmail(email:string): Promise<any>{

        const client = await ClientModel.findOne({"email":email})

        if(!client){
            return []
        }

        if(client === null){
            throw createError(500, 'Not able to connect to database')
        }

        return client

    }

    async createOne(clientData:any){

        clientData["id"] = uuid()

        const client = await this.findOneByEmail(clientData["email"])

        console.log(client)

        if (client.length != 0){
            throw createError(401, `User with email ${clientData["email"]} already exists`)
        }

        const newClient = new ClientModel(clientData)

        try{
            const created = await newClient.save()
            console.log(created)
            return created
        }catch(error){
            throw createError(500, "Not able to create User")
        }

    }

}

export { ClientService }