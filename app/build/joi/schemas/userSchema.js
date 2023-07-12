"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi documentation: https://joi.dev/api/?v=17.9.1
exports.userSchema = joi_1.default.object({
    id: joi_1.default.string().id(),
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    age: joi_1.default.number().integer().required(),
    city: joi_1.default.string(),
    streetName: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    accountName: joi_1.default.string()
});
