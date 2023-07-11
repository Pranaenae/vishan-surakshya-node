import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";
export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    "><><><><><>< ------- From Error Handelling Middleware ------- ><><><><><><",
    err
  );
  console.log({ err: err.status });

  // custom AppError (extends Error)
  if (err instanceof AppError) {
    console.log({ err });
    return res.status(err.status).json({
      //   errorCode: err.errorCode,
      message: err.message,
    });
  }

  return res.status(500).send("Something went wrong");
};

/**
 * If error is not an instanceOf APIError, convert it.
 */
export const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("inside convertor  ");
  let convertedError = err as any;

  if (!(err instanceof AppError)) {
    let message = err.message || "internal Server Error";
    let status = err.status || 500;
    convertedError = new AppError(status, message);
  }

  return errorHandler(convertedError, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  let message = "Route Not found";
  let status = 404;
  const err = new AppError(status, message);
  return errorHandler(err, req, res, next);
};
