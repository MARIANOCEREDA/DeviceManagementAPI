import config from "../configs/index.js";
import mongoose from "mongoose";

export class Connection {

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