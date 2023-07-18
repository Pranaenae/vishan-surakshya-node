import mongoose, { Schema, Types } from "mongoose";
import { IShippingDetails } from "../utils/types/shippingDetails.types";

// const shippingDetailsSchema = new Schema<IShippingDetails>({
//   buyerName: {
//     type: String,
//     required: true,
//   },
//   deliveryTime: {
//     type: Date,
//     required: true,
//   },
//   deliveryCharge: {
//     type: Number,
//     required: true,
//   },
//   deliveryAddress: {
//     type: String,
//     required: true,
//   },
// });

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  Description: {
    type: String,
    required: true,
  },
  shippingDetails: {
    type: Schema.Types.Mixed,
    required: false,
  },
});
export const Product = mongoose.model("products", productSchema);
