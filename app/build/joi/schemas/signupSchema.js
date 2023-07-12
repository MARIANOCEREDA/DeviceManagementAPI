"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi documentation: https://joi.dev/api/?v=17.9.1
exports.signupSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    username: joi_1.default.string().max(30).required(),
    phoneNumber: joi_1.default.string().max(50).required(),
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    password: joi_1.default.string().max(30).required(),
    age: joi_1.default.number().integer().required(),
    email: joi_1.default.string().email().required(),
});
