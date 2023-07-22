"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JwtStrategy = void 0;
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const config_1 = __importDefault(require("../configs/config"));
const extractJwt = passport_jwt_1.default.ExtractJwt;
const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config_1.default.key
};
const JwtStrategy = new passport_jwt_1.default.Strategy(options, (payload, done) => {
  const user = payload;
  console.log(payload);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});
exports.JwtStrategy = JwtStrategy;