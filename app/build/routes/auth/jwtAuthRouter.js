"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get('/auth/token', passport_1.default.authenticate('jwt', { scope: ['profile', 'email'] }), (req, res, next) => {
    res.status(200).json({ message: "Succesfully authenticated with google." });
    next();
});
exports.default = router;
