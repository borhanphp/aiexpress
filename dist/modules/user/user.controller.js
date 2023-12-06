"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.deleteUser = void 0;
const user_service_1 = require("./user.service");
const user_validate_1 = __importStar(require("./user.validate"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodParsedUserData = user_validate_1.default.parse(req.body);
        const result = yield user_service_1.userServices.createUser(zodParsedUserData);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        if (err.statusCode === 404) {
            res.status(404).json({
                success: false,
                message: err.message || 'User already exists!',
                error: {
                    code: err.statusCode,
                    description: err.description,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || 'Something went wrong',
                error: {
                    code: err.code || 500,
                    description: err.description || 'Something went wrong',
                },
            });
        }
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield user_service_1.userServices.getAllUsersFromDb();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: allUsers,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: {
                code: error.statusCode,
                description: error,
            },
        });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_service_1.userServices.getUserByIdFromDb(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: user,
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const zodParsedUserData = user_validate_1.UpdateUserSchemaValidation.parse(req.body);
        const result = yield user_service_1.userServices.updateUserInDb(Number(userId), zodParsedUserData);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (error) {
        if (error.statusCode === 404) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: {
                    code: 404,
                    description: error,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const result = yield user_service_1.userServices.deleteUserfromDb(Number(userId));
        if (result.deletedCount === 1) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: null,
            });
        }
    }
    catch (error) {
        if (error.statusCode === 404) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: {
                    code: 404,
                    description: error,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    }
});
exports.deleteUser = deleteUser;
exports.UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser: exports.deleteUser,
};
