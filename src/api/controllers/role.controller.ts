// import { Request, Response } from "express";
// import { roleService } from "../services/index.service";
// import AppErrorUtil from "../utils/appError";
// import { catchAsync } from "../utils/catchAsync";

// export const createRole = catchAsync(async (req: Request, res: Response) => {
//   const result = await roleService.create(req.body);

//   if (!result) {
//     throw new AppErrorUtil(400, "Could not create role.");
//   }
//   res.status(200).json({ message: "Role created successfully." });
// });

// export const updateRole = catchAsync(async (req: Request, res: Response) => {
//   const result = await roleService.update(req.body);

//   if (!result) {
//     throw new AppErrorUtil(400, "Could not update role.");
//   }
//   res.status(200).json({ message: "Role updated Successfully." });
// });

// export const getRole = catchAsync(async (req: Request, res: Response) => {
//   const result = await roleService.update(req.body);

//   if (!result) {
//     throw new AppErrorUtil(400, "Could not find role.");
//   }
//   res.status(200).json(result);
// });

// export const getAllRole = catchAsync()
