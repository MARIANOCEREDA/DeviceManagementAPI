"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthenticationMethod = void 0;
const passport_1 = __importDefault(require("passport"));
const jwtStrategy_1 = require("./jwtStrategy");
const googleStrategy_1 = require("./googleStrategy");
function setAuthenticationMethod(method, app) {
    switch (method) {
        case 'jwt':
            console.log("Authentication method set to: JWT");
            passport_1.default.initialize();
            passport_1.default.use(jwtStrategy_1.JwtStrategy);
            break;
        case 'google':
            console.log("Authentication method set to: GOOGLE");
            passport_1.default.initialize();
            passport_1.default.use('google', googleStrategy_1.CustomGoogleStrategy);
        default:
            break;
    }
}
exports.setAuthenticationMethod = setAuthenticationMethod;
