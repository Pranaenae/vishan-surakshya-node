import { Request, Response } from "express";
import logger from "../../config/logger";
import { userService } from "../services/index.service";
import AppErrorUtil from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { IregisterUser } from "../utils/types/user.type";

export const registerUser = catchAsync(
  async (req: Request<IregisterUser>, res: Response) => {
    // console.log(req.headers);
    const result = await userService.registerUser(req.body);
    if (!result) {
      throw new AppErrorUtil(400, "Uer not created");
    }
    res.status(200).json({ message: "User created successfully", result });
  }
);

export const emailSending = catchAsync(async (req: Request, res: Response) => {
  console.log("xvb", req.body);
  const result: any = await userService.sendEmail(req.body);
  console.log({ result });
  if (!result) {
    throw new AppErrorUtil(404, "Error In User Credential");
  }
  return res
    .status(200)
    .json({ message: "Check your mail for OTP", success: true, result });
});

export const test = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.test();
  res.send(result);
});
export const OTPVerify = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.verifyOTP(req.body);
  if (!result) {
    throw new AppErrorUtil(400, "Cannot verify your emai,Please try again");
  }
  return res.status(200).json({
    message: "Email verified Successfully",
    success: true,
    result,
  });
});

export const sellerRegister = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userService.register(req.body);
    if (!result) {
      throw new AppErrorUtil(400, "Cannot register user");
    }
    return res.status(200).json({
      message: "Seller registered successfully",
      success: true,
      result,
    });
  }
);

// export const;
