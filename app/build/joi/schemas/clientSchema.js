"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi documentation: https://joi.dev/api/?v=17.9.1
exports.clientSchema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    age: joi_1.default.number().required()
});
