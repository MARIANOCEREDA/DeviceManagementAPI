import { Collection, MongoClient } from "mongodb";

export class ConnectionPool {

    private uri: string;

    constructor() {
      this.uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@empresa.isri2ju.mongodb.net/?authMechanism=DEFAULT`;
    }
  
    async getCollection(collectionName:string){
        const connection = await MongoClient.connect(this.uri)
        const db = connection.db(`${process.env.MONGO_DB_NAME}`)
        const collection = db.collection(collectionName)
        return collection
    }
}