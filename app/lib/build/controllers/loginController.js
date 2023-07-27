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
exports.LoginController = void 0;
const userService_1 = require("../services/userService");
class LoginController {
  constructor() {
    this.service = new userService_1.UserService();
  }
  login(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const loginData = request.body;
        const result = yield this.service.authenticate(loginData.username, loginData.password);
        if (result.auth) {
          response.json({
            token: result.token
          });
        }
      } catch (error) {
        next(error);
      }
    });
  }
}
exports.LoginController = LoginController;