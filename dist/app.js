"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const error_1 = require("./modules/middleware/error");
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use('/api/users', user_route_1.default);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Assignment API',
    });
});
// using error middleware
app.use(error_1.errorMiddleware);
exports.default = app;
