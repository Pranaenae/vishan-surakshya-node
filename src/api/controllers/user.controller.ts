import { Request, Response } from "express";
import { userService } from "../services/index.service";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  const result: any = await userService.createUser(req.body);
  console.log({ result });
  if (!result) {
    throw new AppError(404, "Error In User Credential");
  }
  res
    .status(200)
    .json({ message: "User created successfully.", success: true, result });
});

export const test = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.test();
  res.send(result);
});
