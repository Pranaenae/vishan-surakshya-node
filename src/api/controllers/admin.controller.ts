import { Request, Response } from "express";
import { adminService } from "../services/index.service";
import AppErrorUtil from "../utils/AppError";
import { catchAsync } from "../utils/catchAsync";

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getUsers(req.query);
  if (!result) {
    throw new AppErrorUtil(400, "Error while fetching users");
  }
  return res.status(200).json({
    message: `the list of the ${req.query.userType} are`,
    success: true,
    result,
  });
});
