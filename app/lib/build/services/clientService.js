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
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientService = void 0;
const mongo_1 = require("../db/mongo");
const http_errors_1 = __importDefault(require("http-errors"));
const uuid_1 = require("uuid");
class ClientService {
  constructor() {
    this.connection = new mongo_1.ConnectionPool();
    this.COLLECTION_NAME = process.env.MONGO_COLLECTION_NAME;
  }
  find() {
    return __awaiter(this, void 0, void 0, function* () {
      const clients = (yield this.connection.getCollection(this.COLLECTION_NAME)).find().toArray();
      if ((yield clients).length == 0) {
        throw (0, http_errors_1.default)(404, 'Clients not found');
      }
      if (clients === null) {
        throw (0, http_errors_1.default)(500, 'Not able to connect to database');
      }
      return clients;
    });
  }
  findOneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      const client = (yield this.connection.getCollection(this.COLLECTION_NAME)).find({
        id: id
      });
      if (!client) {
        throw (0, http_errors_1.default)(404, 'Client not found');
      }
      if (client === null) {
        throw (0, http_errors_1.default)(500, 'Not able to connect to database');
      }
      return client;
    });
  }
  createOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
      let created = false;
      while (!created) {
        let id = (0, uuid_1.v4)();
        const client = (yield this.connection.getCollection(this.COLLECTION_NAME)).find({
          id: id
        }).toArray();
        if ((yield client).length == 0) {
          const clientData = Object.assign({
            id: id
          }, data);
          const result = (yield this.connection.getCollection(this.COLLECTION_NAME)).insertOne(clientData);
          console.log(result);
          created = true;
        }
      }
    });
  }
}
exports.ClientService = ClientService;