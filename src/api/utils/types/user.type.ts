import { User } from "../../entity/user.entity";
import { IProduct } from "./product.type";

export class IregisterUser {
  _id?: string;
  name: string;
  email: string;
  pan?: number | null;
  gst?: string | null;
  address?: string;
  userType: string;
  mobileNumber?: string;
  bankName: string;
  accountNumber: number;
  accountHolderName: string;
  password?: string;
  // status?: enum;
  currentUrl?: string;
}

export enum UserTypeEnum {
  Seller = "seller",
  Buyer = "buyer",
}

export enum EmailStatusEnum {
  Verified = "verified",
  Unverified = "unverified",
}
export enum ProfileStatusEnum {
  Pending = "pending",
  Completed = "completed",
}

// export interface IUser extends Request, IProduct {
//   user: User;
// }
