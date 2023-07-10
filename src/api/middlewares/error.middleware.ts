import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";

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

  // custom AppError (extends Error)
  if (err instanceof AppError) {
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
// export const converter = (
//   err: AppError,
//   req: Request,
//   res: Response,
//   _next: NextFunction
// ) => {
//   console.log("inside convertor  ");
//   let convertedError = err;

//   if (!(err instanceof AppError)) {
//     convertedError = new AppError({
//       message: err.message,
//       status: err.status || 500,
//       //   errors: err.errors,
//     });
//   }

//   return errorHandler(convertedError, req, res);
// };

/**
 * Catch 404 and forward to error handler
 */
// export const notFound = (req: Request, res: Response) => {
//   const err = new AppError({
//     message: "Not found",
//     status: httpStatus.NOT_FOUND,
//   });
//   return errorHandler(err, req, res);
// };
