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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_client_1 = __importDefault(require("../../../shared/prisma-client"));
const api_error_1 = __importDefault(require("../../error/api-error"));
const insertUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield prisma_client_1.default.user.create({
        data: payload,
    });
    return createdUser;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield prisma_client_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!userExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User not exists");
    const user = yield prisma_client_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
    delete user.password;
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield prisma_client_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!userExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User not exists");
    const user = yield prisma_client_1.default.user.delete({
        where: {
            id,
        },
    });
    return userExist;
});
const findOneUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield prisma_client_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!userExist)
        throw new api_error_1.default(http_status_1.default.NOT_FOUND, "User not exists");
    delete userExist.password;
    return userExist;
});
const findUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_client_1.default.user.findMany({});
    return users === null || users === void 0 ? void 0 : users.map((i) => {
        const { password } = i, user = __rest(i, ["password"]);
        return user;
    });
});
exports.UserService = {
    insertUser,
    updateUser,
    deleteUser,
    findOneUser,
    findUsers,
};
