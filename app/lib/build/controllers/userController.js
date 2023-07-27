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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
  constructor() {
    this.service = new userService_1.UserService();
  }
  listAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const users = yield this.service.getAll();
        return res.status(200).json({
          users: users
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
exports.UserController = UserController;