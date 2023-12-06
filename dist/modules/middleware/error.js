"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
class ErrorHandler extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.msg = msg;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
    }
}
const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || 'Internal server error';
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: {
            code: err.statusCode,
            description: err.message,
        },
    });
};
exports.errorMiddleware = errorMiddleware;
exports.default = ErrorHandler;
