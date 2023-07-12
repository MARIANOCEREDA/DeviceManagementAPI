"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const clientRouter_1 = __importDefault(require("./clientRouter"));
const loginRouter_1 = __importDefault(require("./loginRouter"));
const signupRouter_1 = __importDefault(require("./signupRouter"));
function appRouter(app) {
    const router = express_1.default.Router();
    app.use('/api/v1', router);
    router.use('/user', userRouter_1.default);
    router.use('/client', clientRouter_1.default);
    router.use('/login', loginRouter_1.default);
    router.use('/signup', signupRouter_1.default);
}
exports.default = appRouter;
