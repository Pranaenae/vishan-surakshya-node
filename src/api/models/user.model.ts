import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  pan: {
    type: Number,
    required: true,
    // unique: true,
  },
  gst: {
    type: String,
    required: true,
    // unique: true
  },
  bankName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    enum: ["verified", "unverified"],
    default: "unverified",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // createdBy: {}
  // updatedBy: {}
});

export const User = mongoose.model("User", userSchema);
