import { OTPRegister } from "../models/registerOtp.model";
import { User } from "../models/user.model";
import AppErrorUtil from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { mailService } from "./index.service";
import { sendOTP } from "./mail.service";
import bcrypt from "bcrypt";

export const sendEmail = async (data: any) => {
  let result: any;
  const { email } = data;
  const existingSeller = await User.findOne({ email });
  if (existingSeller) {
    throw new AppErrorUtil(400, "Seller with this email already exist");
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  let hashedOtp = await bcrypt.hash(otp, 10);
  const otpExpiresAt = new Date();
  otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 1);

  await mailService.sendOTP({ email, otp });
  const existingOTP = await OTPRegister.findOne({ email });
  if (existingOTP) {
    (existingOTP.OTP = hashedOtp), (existingOTP.otpExpiresAt = otpExpiresAt);
    result = existingOTP.save();
    return result;
  } else {
    const registerOTP = new OTPRegister({
      email: email,
      otpExpiresAt: otpExpiresAt,
      OTP: hashedOtp,
    });

    result = await registerOTP.save();
    return result;
  }
};

export const verifyOTP = async (data: any) => {
  const { email, otp } = data;
  const seller = await OTPRegister.findOne({ email });
  if (!seller) {
    throw new AppErrorUtil(404, "Seller with this email not found");
  }
  if (new Date() > seller.otpExpiresAt) {
    throw new AppErrorUtil(
      400,
      "OTP expired,please send another OTP to verify email"
    );
  }
  const verify = await bcrypt.compare(otp, seller.OTP);
  if (!verify) {
    throw new AppErrorUtil(400, "Invalid OTP");
  }
  seller.isVerified = true;
  const success = await seller.save();
  return success;
};

export const register = async (data: any) => {
  const { userName, email, password } = data;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppErrorUtil(
      400,
      "Seller with this email already registered,please login to proceed "
    );
  }
  const verifiedUser = await OTPRegister.findOne({ email });
  if (!verifiedUser) {
    throw new AppErrorUtil(404, "User with this email not found ");
  }
  if (!verifiedUser?.isVerified) {
    throw new AppErrorUtil(
      400,
      "Verify your email through OTP for registration"
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });
  const result = await newUser.save();
  return result;
};

export const test = async () => {
  let x = "aaa";
  return x;
};
