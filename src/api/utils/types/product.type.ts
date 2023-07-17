import mongoose, { Document } from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  // image: string;
  file: any;
  deliveryTime: Date;
  deliveryCharge: number;
  deliveryAddress: string;
  toggleStatus: Boolean;
}
