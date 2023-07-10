import { Request, Response } from "express";
import { userService } from "../services/index.service";
import { catchAsync } from "../utils/catchAsync";

const register = catchAsync(async (req: Request, res: Response) => {
  //sample
  //   const user = await userService.createUser(req.body);
  //   const tokens = await tokenService.generateAuthTokens(user);
  //   res.status(httpStatus.CREATED).send({ user, tokens });
  //   const x = await userService.create();
});
