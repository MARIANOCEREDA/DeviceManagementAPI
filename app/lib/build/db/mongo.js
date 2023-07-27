"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectionPool = void 0;
const mongodb_1 = require("mongodb");
class ConnectionPool {
  constructor() {
    this.uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@empresa.isri2ju.mongodb.net/?authMechanism=DEFAULT`;
  }
  getCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
      const connection = yield mongodb_1.MongoClient.connect(this.uri);
      const db = connection.db(`${process.env.MONGO_DB_NAME}`);
      const collection = db.collection(collectionName);
      return collection;
    });
  }
}
exports.ConnectionPool = ConnectionPool;