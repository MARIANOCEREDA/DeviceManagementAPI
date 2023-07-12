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
const express_1 = __importDefault(require("express"));
const validationHandler_1 = require("../middlewares/validationHandler");
const signupSchema_1 = require("../joi/schemas/signupSchema");
const signupController_1 = require("../controllers/signupController");
const router = express_1.default.Router();
router.post('/', (0, validationHandler_1.validatorHandler)(signupSchema_1.signupSchema, 'body'), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new signupController_1.SignupController();
    yield controller.createUser(request, response, next);
}));
exports.default = router;