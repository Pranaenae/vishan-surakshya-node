import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../utils/types/types";
import { User } from "../models/user.model";
import AppErrorUtil from "../utils/appError";

export const isAuth = async (
  req: IRequestWithUser<any, any, any, any>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No token", success: false });
    }
    const bearerToken = req.headers.authorization || req.cookies.session;

    if (!bearerToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized !", success: false });
    } else {
      const token = bearerToken.split(" ")[1];

      jwt.verify(
        token,
        process.env.JWT_SECRET!,
        async (err: any, decoded: any) => {
          if (err)
            res.status(401).json({
              message: "Token expired or invalid signature.",
              success: false,
            });

          // TypeORM sample
          //   const userSchema = AppDataSource.getRepository(User);
          //   const user = await userSchema.findOne({
          //     where: { id: decoded.id },
          //     relations: { employee: true, roles: true },
          //   });

          // Mongoose sample (to do)
          const user = await User.findOne({
            _id: decoded.id,
            // "status.status": true,
          });
          // .populate("department role")
          // .select(["-__v", "-password"]);

          if (!user) {
            throw new AppErrorUtil(400, "Unvalid token");
          } else {
            req.user = user;
            next();
          }
        }
      );
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in authorization.", success: false });
  }
};
