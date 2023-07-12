import mongoose from "mongoose";
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  OTP: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otpExpiresAt: {
    type: Date,
    required: true,
  },
});
export const OTPRegister = mongoose.model("OTP", otpSchema);
