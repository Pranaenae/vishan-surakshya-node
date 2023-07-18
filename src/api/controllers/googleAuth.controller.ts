import { Request, Response } from "express";
import { googleService, userService } from "../services/index.service";
import AppErrorUtil from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { User } from "../models/user.model";

export const getCode = catchAsync(async (req: Request, res: Response) => {
  const result = await googleService.getGoogleAuthURL();
  // return res.send(result);
  if (!result) {
    throw new AppErrorUtil(400, "Unable to redirect");
  }
  return res
    .status(200)
    .json({ message: "redirection URL", success: true, result });
});

export const getAccessToken = catchAsync(
  async (req: Request, res: Response) => {
    const result = await googleService.getGoogleUser(req.query.code);
    // return res.send(result);
    if (!result) {
      throw new AppErrorUtil(400, "Unable to redirect");
    }
    const existUser = await User.findOne({ where: { email: result.email } });
    if (!existUser) {
      const newUser = new User({
        name: result.name,
        email: result.email,
      });
      await newUser.save();
      return res
        .status(200)
        .json({ message: "Successfully login", success: true, newUser });
    }
    return res
      .status(200)
      .json({ message: "Successfully login", success: true, result });
  }
);
