import { Request, Response } from "express";
import { googleService, userService } from "../services/index.service";
import AppErrorUtil from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";
import { User } from "../Entity/user.entity";
import datasource from "../../config/ormConfig";

const userRepository = datasource.getRepository(User);

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
    const existUser = await userRepository.findOne({
      where: { email: result.email },
    });
    if (!existUser) {
      const newUser = new User();
      (newUser.name = result.name),
        (newUser.email = result.email),
        await userRepository.save(newUser);
      return res
        .status(200)
        .json({ message: "Successfully login", success: true, newUser });
    }
    return res
      .status(200)
      .json({ message: "Successfully login", success: true, result });
  }
);
