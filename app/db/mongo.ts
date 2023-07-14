import { Collection, MongoClient } from "mongodb";
import mongoose from "mongoose";

export class Connection {

    private uri: string;

    constructor() {
      this.uri = `mongodb://127.0.0.1:27017/${process.env.MONGO_DB_NAME}`;
    }

    connect(){

      try {
        mongoose.connect(this.uri);
      } catch (error) {
        throw error
      }
      
    }
}