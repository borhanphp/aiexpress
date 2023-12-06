import { NextFunction, Request, Response } from 'express';

class ErrorHandler extends Error {
  constructor(
    public msg: string,
    public statusCode: number,
  ) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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

export default ErrorHandler;
