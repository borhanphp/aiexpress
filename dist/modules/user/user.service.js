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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../config");
const error_1 = __importDefault(require("../middleware/error"));
const user_model_1 = __importDefault(require("./user.model"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_model_1.default(user);
    const isUserExits = yield user_model_1.default.isUserExits(user.userId);
    if (isUserExits) {
        throw new error_1.default('User already exists', 404);
    }
    const result = yield newUser.save();
    const _a = result.toObject(), { password, orders } = _a, rest = __rest(_a, ["password", "orders"]);
    return rest;
});
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_model_1.default.find({}, { password: 0, orders: 0 });
        return allUsers;
    }
    catch (error) {
        return error;
    }
});
const getUserByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ userId: id }, { password: 0, orders: 0 });
    if (!user) {
        throw new error_1.default(`No user found`, 404);
    }
    return user;
});
const updateUserInDb = (id, updatedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExits = yield user_model_1.default.isUserExits(Number(id));
    if (!isUserExits) {
        throw new error_1.default('User not found', 404);
    }
    else {
        if (updatedInfo.password) {
            updatedInfo.password = yield bcrypt_1.default.hash(updatedInfo.password, Number(config_1.config.salt));
        }
        const updatedDoc = yield user_model_1.default.findOneAndUpdate({ userId: id }, updatedInfo, {
            new: true,
            runValidators: true,
            select: '-password',
        });
        return updatedDoc;
    }
});
const deleteUserfromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExits = yield user_model_1.default.isUserExits(Number(id));
    if (!isUserExits) {
        throw new error_1.default('User not found', 404);
    }
    const result = user_model_1.default.deleteOne({ userId: id });
    return result;
});
exports.userServices = {
    createUser,
    getAllUsersFromDb,
    getUserByIdFromDb,
    updateUserInDb,
    deleteUserfromDb,
};
