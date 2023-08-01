import { Request, Response } from "express";
import { productService } from "../services/index.service";
import AppErrorUtil from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { IProduct } from "../utils/types/product.type";
import { IRequestWithUser } from "../utils/types/types";

export const createProduct = catchAsync(
  async (req: IRequestWithUser<any, any, IProduct, any>, res: Response) => {
    const result = await productService.create(req.user, req.body, req.files);

    if (!result) {
      throw new AppErrorUtil(400, "Could not create product.");
    }
    const link = `${req.headers.origin}/transaction/:${result.id}`;
    // const returnResult = await transactionService.logEntry({
    //   description: "placed an order",
    //   user: user,
    //   product: result,
    // });

    res.status(200).json({
      message: "Product created successfully.",
      result,
      link,
    });
  }
);

export const updateProduct = catchAsync(
  async (req: Request<IProduct>, res: Response) => {
    const result = await productService.update(req.body);

    if (!result) {
      throw new AppErrorUtil(400, "Could not update role.");
    }
    res.status(200).json({ message: "Role updated Successfully.", result });
  }
);

export const getProduct = catchAsync(
  async (req: Request<IProduct>, res: Response) => {
    const result = await productService.get(req.params);

    if (!result) {
      throw new AppErrorUtil(400, "Could not find product.");
    }
    res.status(200).json(result);
  }
);

export const getAllProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getAll();
  res.status(200).json(result);
});

export const deleteProduct = catchAsync(
  async (req: Request<IProduct>, res: Response) => {
    const result = await productService.del(req.params);
    res
      .status(200)
      .json({ message: "Product deleted successfully.", data: result });
  }
);

export const toggleProduct = catchAsync(
  async (req: Request<any, any, IProduct>, res: Response) => {
    const result = await productService.toggle(req.body);
    res.status(200).json({ message: "Product toggled successfully." });
  }
);
