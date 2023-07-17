import { Request, Response } from "express";
import { imageService } from "../services/index.service";
import { catchAsync } from "../utils/catchAsync";

export const getImage = catchAsync(
  async (req: Request<{ filename: string }>, res: Response) => {
    const result = await imageService.get(req.params);
    res.status(200).sendFile(result);
  }
);
