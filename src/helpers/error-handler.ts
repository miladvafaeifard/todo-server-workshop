import { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent) {
    return next(error);
  }
  response.status(500).send('Sorry');
};
