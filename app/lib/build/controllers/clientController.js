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
exports.ClientController = void 0;
const clientService_1 = require("../services/clientService");
class ClientController {
  constructor() {
    this.clientService = new clientService_1.ClientService();
  }
  create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const body = req.body;
        console.log(body);
        const created = yield this.clientService.createOne(body);
        res.status(200).json({
          createdUser: body
        });
      } catch (error) {
        next(error);
      }
    });
  }
  listAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const clients = yield this.clientService.find();
        /* 200 “OK” – La respuesta para una solicitud HTTP exitosa. El resultado dependerá del tipo de solicitud.
        https://www.siteground.es/kb/codigos-error-http-explicados/?gclid=CjwKCAjw-b-kBhB-EiwA4fvKrHLqJeU4aro_otXfwnSfCyBdfc9JCYSlJPX1WSBp7J4V85BAXkZ7rxoCNrkQAvD_BwE
        */
        return res.status(200).json({
          clients: clients
        });
      } catch (error) {
        next(error);
      }
      next();
    });
  }
  update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {});
  }
  listOne(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {});
  }
}
exports.ClientController = ClientController;