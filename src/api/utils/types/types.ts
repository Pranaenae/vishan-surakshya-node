import { Request } from "express";
import { User } from "../../models/user.model";

export interface IRequestWithUser<P, Q, R, S> extends Request<P, Q, R, S> {
  user?: typeof User;
}
