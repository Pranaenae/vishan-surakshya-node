import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../utils/types/types";
import { User } from "../Entity/user.entity";
import AppErrorUtil from "../utils/appError";
import datasource from "../../config/ormConfig";

const userRepository = datasource.getRepository(User);
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
    console.log("mk", bearerToken);

    if (!bearerToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized !", success: false });
    } else {
      const token = bearerToken.split(" ")[1];

      jwt.verify(
        token,
        process.env.JWT_SECRET_KEY!,
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
          console.log({ decoded });
          // Mongoose sample (to do)
          const user = await userRepository.findOneBy({
            id: decoded.id,
            // "status.status": true,
          });
          console.log({ user });
          // .populate("department role")
          // .select(["-__v", "-password"]);

          if (!user) {
            return res.status(400).json({
              message: "Invalid Token",
            });
          } else {
            //@ts-ignore
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
