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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../../config");
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    userId: {
        type: Number,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    fullName: {
        firstName: { type: String, required: true, max: 10 },
        lastName: { type: String, required: true, max: 10 },
    },
    age: { type: Number, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    orders: {
        type: [
            {
                product: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        default: undefined,
    },
});
//instance methods
userSchema.static('isUserExits', function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ userId });
        return user;
    });
});
//middlewares
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt_1.default.genSalt(Number(config_1.config.salt));
            const hashedPassword = yield bcrypt_1.default.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
