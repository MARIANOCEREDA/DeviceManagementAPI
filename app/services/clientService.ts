import { Collection } from "mongodb"
import { ConnectionPool } from "../db/mongo"
import createError from 'http-errors'
import { v4 as uuidv4 } from 'uuid';

class ClientService{
    
    private connection:ConnectionPool
    private COLLECTION_NAME:string

    constructor(){
        this.connection = new ConnectionPool();
        this.COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME!
    }

    async find(){
        const clients = (await this.connection.getCollection(this.COLLECTION_NAME)).find().toArray();

        if((await clients).length == 0){
            throw createError(404, 'Clients not found')
        }

        if(clients === null){
            throw createError(500, 'Not able to connect to database')
        }

        return clients
    }

    async findOneById(id:string){
        const client = (await this.connection.getCollection(this.COLLECTION_NAME)).find({id:id});

        if(!client){
            throw createError(404, 'Client not found')
        }

        if(client === null){
            throw createError(500, 'Not able to connect to database')
        }

        return client
    }

    async createOne(data){

        let created:boolean = false

        while(!created){
            
            let id = uuidv4();

            const client = (await this.connection.getCollection(this.COLLECTION_NAME)).find({id:id}).toArray();

            if((await client).length == 0){
                const clientData = {
                    id:id,
                    ...data
                }
                const result = (await this.connection.getCollection(this.COLLECTION_NAME)).insertOne(clientData)
                console.log(result)
                created = true
            }
            
        }
    }

}

export { ClientService }