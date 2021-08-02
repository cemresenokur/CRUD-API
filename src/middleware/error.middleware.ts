import { HttpException } from '../exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';

  console.log('[ERROR] ', status, message);

  res.status(status).json({ message });
}

export default errorMiddleware;