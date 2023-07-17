import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      // required: true,
    },
    deliveryTime: {
      type: Date,
      // type: String,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    toggleStatus: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    // createdBy: {}
    // updatedBy: {}
  },
  { versionKey: false } // removes __v  field
);

export const Product = mongoose.model("products", productSchema);
