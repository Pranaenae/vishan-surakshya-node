import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { litigationService } from "../services/index.service";
import AppErrorUtil from "../utils/appError";
import { ILitigationRequest } from "../utils/types/litigation.types";

export const newLitigation = catchAsync(async (req: Request, res: Response) => {
  const requestData: ILitigationRequest = {
    id: req.params.id,
    reason: req.body.reason,
    issue: req.body.issue,
    doc: req.files, // Assuming you are using Multer and correctly handling file uploads in the middleware
  };
  console.log({ requestData });
  // const [doc1, doc2] = req.files;
  const result = await litigationService.createLitigation(requestData);
  console.log({ result });
  if (!result) {
    throw new AppErrorUtil(400, "Unable to create litigation");
  }
  res
    .status(200)
    .json({ message: "Litigation created successfully", data: result });
});
