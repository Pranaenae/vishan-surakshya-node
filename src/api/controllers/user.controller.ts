import { Request, Response } from "express";
import logger from "../../config/logger";
import { mailService, userService } from "../services/index.service";
import AppErrorUtil from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { IregisterUser } from "../utils/types/user.type";
import jwt from "jsonwebtoken";
import { User } from "../entity/user.entity";
import moment from "moment";
import bcrypt from "bcrypt";

export const registerUser = catchAsync(
  async (req: Request<IregisterUser>, res: Response) => {
    const origin = req.headers.origin;
    console.log(req.headers);
    const result = await userService.registerUser(req.body, origin);
    if (!result) {
      throw new AppErrorUtil(400, "User not created");
    }
    res.status(200).json({ message: "User created successfully", result });
  }
);

export const setPassword = catchAsync(async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.user;
  const data = req.body;
  const test = {
    ...data,
    user,
  };
  const result = await userService.setPassword({ ...data, user });
  if (!result) {
    throw new AppErrorUtil(400, "Error while updating password");
  }
  return res
    .status(200)
    .json({ message: "Password set successfully", success: true, result });
});

// export const emailSending = catchAsync(async (req: Request, res: Response) => {
//   console.log("xvb", req.body);
//   const result: any = await userService.sendEmail(req.body);
//   console.log({ result });
//   if (!result) {
//     throw new AppErrorUtil(404, "Error In User Credential");
//   }
//   return res
//     .status(200)
//     .json({ message: "Check your mail for OTP", success: true, result });
// });

export const test = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.test();
  res.send(result);
});
// export const OTPVerify = catchAsync(async (req: Request, res: Response) => {
//   const result = await userService.verifyOTP(req.body);
//   if (!result) {
//     throw new AppErrorUtil(400, "Cannot verify your emai,Please try again");
//   }
//   return res.status(200).json({
//     message: "Email verified Successfully",
//     success: true,
//     result,
//   });
// });

// export const sellerRegister = catchAsync(
//   async (req: Request, res: Response) => {
//     const result = await userService.register(req.body);
//     if (!result) {
//       throw new AppErrorUtil(400, "Cannot register user");
//     }
//     return res.status(200).json({
//       message: "Seller registered successfully",
//       success: true,
//       result,
//     });
//   }
// );

export const sellerLogin = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers);
  const result = await userService.login(req.body);
  if (!result) {
    throw new AppErrorUtil(400, "Cannot login, please try again");
  }
  return res.status(200).json({
    message: "Successfully Login",
    success: true,
    token: result.token,
  });
});

export const forgetPassword = catchAsync(
  async (req: Request, res: Response) => {
    const origin = req.headers.origin;
    const result = await userService.forgetPassword(req.body, origin);
    if (!result) {
      throw new AppErrorUtil(400, "Cannot send email");
    }
    return res.status(200).json({
      message: "Check your email to reset password",
      success: true,
      result,
    });
  }
);

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.resetPassword(req.body);
  if (!result) {
    throw new AppErrorUtil(400, "Error resetting Password,Please try again");
  }
  return res.status(200).json({
    message: "Password reset successfully",
    success: true,
    result,
  });
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.user;
  const result = await userService.getProfile(user);
  if (!result) {
    throw new AppErrorUtil(400, "Error while fetching profile");
  }
  return res.status(200).json({
    message: "your profile is:",
    success: true,
    result,
  });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  //@ts-ignore
  const user = req.user;
  const body = req.body;
  const result = await userService.update({ user, body });
  if (!result) {
    throw new AppErrorUtil(400, "Error while updating user");
  }
  return res.status(200).json({
    message: "User updated successfully",
    success: true,
    result,
  });
});
