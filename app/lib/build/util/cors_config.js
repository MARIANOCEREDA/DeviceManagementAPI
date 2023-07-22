"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const whitelist = [`http://localhost:${process.env.SERVER_PORT}`];
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

exports.default = corsOptions;