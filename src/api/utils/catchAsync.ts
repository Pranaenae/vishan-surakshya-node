import { NextFunction, Request, Response } from "express";

export const catchAsync =
  (controller) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controller(req, res, next)).catch((err) => next(err));
  };
