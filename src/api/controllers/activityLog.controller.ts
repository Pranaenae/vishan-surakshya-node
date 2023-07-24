import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { activityService } from "../services/index.service";
import AppErrorUtil from "../utils/appError";

export const logEntry = catchAsync(async (req: Request, res: Response) => {
  const result = await activityService.logEntry(req.body);
  res
    .status(200)
    .json({ message: "Product deleted successfully.", data: result });
});

export const getActivityByProductId = catchAsync(
  async (req: Request, res: Response) => {
    console.log("xvb");
    console.log(req.params);
    const result = await activityService.logByProductId(req.params);
    if (!result) {
      throw new AppErrorUtil(400, "Unable to retrive the activity log");
    }
    res
      .status(200)
      .json({ message: `Activity log of product is:`, data: result });
  }
);
