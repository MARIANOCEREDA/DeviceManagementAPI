"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_parser_1 = __importDefault(require("./util/arg_parser"));
// Always import dotenv first
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./configs/config"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set('key', config_1.default);
// Middleware for logging : https://www.npmjs.com/package/morgan 
app.use((0, morgan_1.default)('combined'));
// Middleware to enable access from different routes: https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/ 
//app.use(cors(corsOptions))
let { port } = (0, arg_parser_1.default)();
require('./auth');
(0, routes_1.default)(app);
// Errr middlewares
app.use(errorHandler_1.logErrors);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log("Server listening to port: " + port);
});
