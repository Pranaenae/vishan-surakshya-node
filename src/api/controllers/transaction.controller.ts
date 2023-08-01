import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { transactionService } from "../services/index.service";
import AppErrorUtil from "../utils/appError";
import { IRequestWithUser } from "../utils/types/types";

export const logEntry = catchAsync(async (req: Request, res: Response) => {
  const result = await transactionService.logEntry(req.body);
  res
    .status(200)
    .json({ message: "Product deleted successfully.", data: result });
});

export const getActivityByProductId = catchAsync(
  async (req: Request, res: Response) => {
    const result = await transactionService.transactionByProductId(req.params);
    if (!result) {
      throw new AppErrorUtil(400, "Unable to retrive the transaction log");
    }
    res
      .status(200)
      .json({ message: `Transaction log of product is:`, data: result });
  }
);

export const acceptTransaction = catchAsync(
  async (req: IRequestWithUser<any, any, any, any>, res: Response) => {
    const result = await transactionService.accept(req.params, req.user);
    if (!result) {
      throw new AppErrorUtil(400, "Unable to accept transaction.");
    }
    res.status(200).json({ message: "Transaction accepted.", data: result });
  }
);
