import mongoose, { Document } from "mongoose";

export interface IRole extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  toggleStatus?: Boolean;
}
