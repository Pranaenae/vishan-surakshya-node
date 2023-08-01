import { Request } from "express";

export interface IProduct extends Request {
  id: number;
  name: string;
  description: string;
  image: string;
  file: any;
  deliveryTime: Date;
  deliveryCharge: number;
  deliveryAddress: string;
  status: boolean;
  user?: any;
}
