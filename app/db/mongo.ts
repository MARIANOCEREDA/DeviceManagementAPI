import config from "../configs";
import mongoose from "mongoose";

export class Connection {

    private uri: string;

    constructor() {
      this.uri = `mongodb://${config.mongo.dbHost}:${config.mongo.port}/${config.mongo.dbName}`;
    }

    connect(){

      try {
        mongoose.connect(this.uri);
      } catch (error) {
        throw error
      }
      
    }
}