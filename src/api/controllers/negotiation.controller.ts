import { Request, Response } from "express";
import { negotiationService } from "../services/index.service";
import AppErrorUtil from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { INegotiation } from "../utils/types/negotiation.type";
import { IRequestWithUser } from "../utils/types/types";

export const createNegotiation = catchAsync(
  async (req: IRequestWithUser<any, any, INegotiation, any>, res: Response) => {
    const result = await negotiationService.create(req.body);
    if (!result) {
      throw new AppErrorUtil(400, "Could not create negotitation.");
    }
    res.status(200).json({
      message: "Negotiation created successfully.",
    });
  }
);

export const getNegotiation = catchAsync(
  async (req: Request<INegotiation>, res: Response) => {
    const result = await negotiationService.get(req.params);
    res.status(200).json({ data: result });
  }
);

export const renegotiate = catchAsync(
  async (req: Request<any, any, INegotiation>, res: Response) => {
    const result = await negotiationService.renegotiate(req.body);
    if (!result) {
      throw new AppErrorUtil(400, "Negotiation unsuccessfull.");
    }
    res.status(200).json({ message: "Re-Negotiation successfull." });
  }
);

export const changeStatus = catchAsync(
  async (req: Request<INegotiation>, res: Response) => {
    const result = await negotiationService.changeStatus(req.body);
    if (!result) {
      throw new AppErrorUtil(400, "Status unchanged. Please try again.");
    }
    res.status(200).json({ message: "Status changed successfully." });
  }
);
