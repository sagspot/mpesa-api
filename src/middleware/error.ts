import { NextFunction, Request, Response } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

interface ErrorHandler {
  (
    error: ErrorWithStatus,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void;
}

const catchErr = (_req: Request, _res: Response, next: NextFunction) => {
  const error: ErrorWithStatus = new Error('Not found');
  error.status = 404;
  next(error);
};

const errorHandler: ErrorHandler = (error, _req, res, _next) => {
  res.status(error.status || 500).json({ message: error.message });
};

export { catchErr, errorHandler };
