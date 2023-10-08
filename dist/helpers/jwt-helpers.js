"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelpers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const api_error_1 = __importDefault(require("../app/error/api-error"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (data) => {
    var token = jsonwebtoken_1.default.sign(data, config_1.default.JWT_SECRET_ACCESS, {
        expiresIn: config_1.default.JWT_SECRET_EXPIRY,
    });
    return token;
};
const verifyToken = (token) => {
    if (token) {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET_ACCESS);
        return decoded;
    }
    else {
        throw new api_error_1.default(http_status_1.default.FORBIDDEN, "Forbidden Access!");
    }
};
exports.JwtHelpers = {
    generateToken,
    verifyToken,
};
