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
exports.ClientController = void 0;
const clientService_1 = require("../services/clientService");
const http_errors_1 = __importDefault(require("http-errors"));
const debug_1 = __importDefault(require("debug"));
constlog: (0, debug_1.default)('app:client-service');
class ClientController {
    constructor() {
        this.clientService = new clientService_1.ClientService();
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield this.clientService.find();
                /* 200 “OK” – La respuesta para una solicitud HTTP exitosa. El resultado dependerá del tipo de solicitud.
                https://www.siteground.es/kb/codigos-error-http-explicados/?gclid=CjwKCAjw-b-kBhB-EiwA4fvKrHLqJeU4aro_otXfwnSfCyBdfc9JCYSlJPX1WSBp7J4V85BAXkZ7rxoCNrkQAvD_BwE
                */
                return res.status(200).json({ clients: clients });
            }
            catch (error) {
                next(error);
            }
            next();
        });
    }
    createOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientData = req.body;
                console.log(clientData);
                const client = yield this.clientService.createOne(clientData);
                return res.status(200).json({ client: client });
            }
            catch (error) {
                next(error);
            }
            next();
        });
    }
    getOneByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.query;
                const client = yield this.clientService.findOneByEmail(email);
                if (client.length == 0) {
                    throw (0, http_errors_1.default)(404, "Client not found.");
                }
                else {
                    return res.status(200).json({ client: client });
                }
            }
            catch (error) {
                next(error);
            }
            next();
        });
    }
}
exports.ClientController = ClientController;
