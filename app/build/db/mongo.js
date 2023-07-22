"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Connection {
    constructor() {
        this.uri = `mongodb://127.0.0.1:27017/${process.env.MONGO_DB_NAME}`;
    }
    connect() {
        try {
            mongoose_1.default.connect(this.uri);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Connection = Connection;
