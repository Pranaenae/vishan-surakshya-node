import { Request } from "express";
import mongoose, { Document } from "mongoose";

export interface IProduct extends Request {
  id: string;
  name: string;
  description: string;
  image: string;
  file: any;
  deliveryTime: Date;
  deliveryCharge: number;
  deliveryAddress: string;
  toggleStatus: Boolean;
  user?: any;
}
