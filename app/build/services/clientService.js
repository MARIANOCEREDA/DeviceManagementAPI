"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const mongo_1 = require("../db/mongo");
const http_errors_1 = __importDefault(require("http-errors"));
const clientSchema_1 = require("../models/mongoose/clientSchema");
const uuid_1 = require("uuid");
const debug_1 = __importDefault(require("debug"));
constlog: (0, debug_1.default)('app:client-service');
class ClientService {
    constructor() {
        new mongo_1.Connection().connect();
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = yield clientSchema_1.ClientModel.find();
            if (!clients) {
                throw (0, http_errors_1.default)(404, 'Clients not found');
            }
            if (clients === null) {
                throw (0, http_errors_1.default)(500, 'Not able to connect to database');
            }
            return clients;
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield clientSchema_1.ClientModel.findOne({ "email": email });
            if (!client) {
                return [];
            }
            if (client === null) {
                throw (0, http_errors_1.default)(500, 'Not able to connect to database');
            }
            return client;
        });
    }
    createOne(clientData) {
        return __awaiter(this, void 0, void 0, function* () {
            clientData["id"] = (0, uuid_1.v4)();
            const client = yield this.findOneByEmail(clientData["email"]);
            console.log(client);
            if (client.length != 0) {
                throw (0, http_errors_1.default)(401, `User with email ${clientData["email"]} already exists`);
            }
            const newClient = new clientSchema_1.ClientModel(clientData);
            try {
                const created = yield newClient.save();
                console.log(created);
                return created;
            }
            catch (error) {
                throw (0, http_errors_1.default)(500, "Not able to create User");
            }
        });
    }
}
exports.ClientService = ClientService;
