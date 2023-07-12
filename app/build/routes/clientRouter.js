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
const clientController_1 = require("../controllers/clientController");
const validationHandler_1 = require("../middlewares/validationHandler");
const clientSchema_1 = require("../joi/schemas/clientSchema");
const router = express_1.default.Router();
const controller = new clientController_1.ClientController();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.listAll(req, res, next);
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.listOne(req, res, next);
}));
router.post('/', (0, validationHandler_1.validatorHandler)(clientSchema_1.clientSchema, 'body'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield controller.create(req, res, next);
}));
exports.default = router;
