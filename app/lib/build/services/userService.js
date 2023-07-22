"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = void 0;
const mysql_1 = __importDefault(require("../db/mysql"));
const crypto_1 = __importDefault(require("crypto"));
const uuid_1 = require("uuid");
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../configs/config"));
/**
 * @name UserService
 * @type class
 *
 * @brief Manages interaction with the Users table in MYSQL
 */
class UserService {
  constructor() {
    this.connection = mysql_1.default;
    this.dbName = process.env.MYSQL_DB_NAME;
    this.dbTableName = process.env.MYSQL_USERS_TABLENAME;
  }
  create(userData) {
    return __awaiter(this, void 0, void 0, function* () {
      let connection;
      try {
        connection = yield this.connection.getConnection();
      } catch (error) {
        throw (0, http_errors_1.default)(500, "Not able to connect to the Database.");
      }
      const {
        salt,
        password
      } = this.hashPassword(userData.password);
      const query = `INSERT INTO ${this.dbName}.${this.dbTableName} (FirstName, LastName, Username, PhoneNumber, State, City,
                        Country, PasswordHash, UserId, Salt, Email, Age) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
      let userId = this.generateUUID();
      let userFound = yield this.getUserByUsername(userData.username);
      const dataToInsert = [userData.firstName, userData.lastName, userData.username, userData.phoneNumber, userData.state, userData.city, userData.country, password, userId, salt, userData.email, userData.age];
      if (userFound.length === 0) {
        return yield connection.execute(query, dataToInsert);
      } else {
        throw (0, http_errors_1.default)(409, "Username: " + userData.username + " already exists.");
      }
    });
  }
  getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
      let connection;
      try {
        connection = yield this.connection.getConnection();
      } catch (error) {
        throw (0, http_errors_1.default)(500, "Not able to connect to the Database.");
      }
      const query = `SELECT UserId FROM ${this.dbName}.${this.dbTableName} WHERE UserId = ${id}`;
      const [rows] = yield connection.execute(query);
      if (rows.length == 1) {
        return rows;
      } else {
        return [];
      }
    });
  }
  getUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
      let connection;
      try {
        connection = yield this.connection.getConnection();
      } catch (error) {
        throw (0, http_errors_1.default)(500, "Not able to connect to the Database.");
      }
      const query = `SELECT Username FROM ${this.dbName}.${this.dbTableName} WHERE Username = '${username}'`;
      const [rows] = yield connection.query(query);
      if (rows.length == 1) {
        return rows;
      } else {
        return [];
      }
    });
  }
  authenticate(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
      const user = yield this.getUserByUsername(username);
      let connection;
      try {
        connection = yield this.connection.getConnection();
      } catch (error) {
        throw (0, http_errors_1.default)(500, "Not able to connect to the Database.");
      }
      if (user.length === 0) {
        throw (0, http_errors_1.default)(404, "User not found.");
      } else {
        const getDataQuery = `SELECT PasswordHash, Salt, UserId FROM ${this.dbName}.${this.dbTableName} WHERE Username = '${username}'`;
        const [rows] = yield connection.query(getDataQuery);
        const incomingHashedPassword = this.hashPasswordWithSalt(password, rows[0].Salt);
        if (incomingHashedPassword === rows[0].PasswordHash) {
          const payload = {
            sub: rows[0].UserId,
            username: username,
            iat: Date.now()
          };
          const token = jsonwebtoken_1.default.sign(payload, config_1.default.key, {
            expiresIn: 1440
          });
          return {
            auth: true,
            token: token
          };
        } else {
          throw (0, http_errors_1.default)(401, "Username or password incorrect.");
        }
      }
    });
  }
  getToken(username) {
    return __awaiter(this, void 0, void 0, function* () {
      let connection;
      try {
        connection = yield this.connection.getConnection();
      } catch (error) {
        throw (0, http_errors_1.default)(500, "Not able to connect to the Database.");
      }
      const query = `SELECT Token FROM ${this.dbName}.${this.dbTableName} WHERE Username = '${username}'`;
      const [result] = yield connection.query(query);
      if (result[0].Token) {
        return result[0].Token;
      } else {
        throw (0, http_errors_1.default)(401, "Token was not found.");
      }
    });
  }
  getAll() {
    return __awaiter(this, void 0, void 0, function* () {
      let connection;
      try {
        connection = yield this.connection.getConnection();
      } catch (error) {
        throw (0, http_errors_1.default)(500, "Not able to connect to the Database.");
      }
      const query = `SELECT * FROM ${this.dbName}.${this.dbTableName}`;
      const [result] = yield connection.query(query);
      return result;
    });
  }
  generateUUID() {
    return (0, uuid_1.v4)();
  }
  hashPassword(password) {
    const salt = [(0, uuid_1.v4)(), (0, uuid_1.v4)()].join('_');
    const hash = crypto_1.default.createHash('sha256');
    hash.update([password, salt].join(''));
    const hashedValue = hash.digest('hex');
    return {
      salt: salt,
      password: hashedValue
    };
  }
  hashPasswordWithSalt(password, salt) {
    const hash = crypto_1.default.createHash('sha256');
    hash.update([password, salt].join(''));
    const hashedValue = hash.digest('hex');
    return hashedValue;
  }
}
exports.UserService = UserService;