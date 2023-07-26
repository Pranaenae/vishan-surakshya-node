import { Request } from "express";
import { User } from "../../Entity/user.entity";

export interface IRequestWithUser<P, Q, R, S> extends Request<P, Q, R, S> {
  user?: typeof User;
}
