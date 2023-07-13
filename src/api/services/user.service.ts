import { OTPRegister } from "../models/registerOtp.model";
import { User } from "../models/user.model";
import AppErrorUtil from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { mailService } from "./index.service";
import { sendMailService, sendOTP } from "./mail.service";
import bcrypt from "bcrypt";
import { IregisterUser } from "../utils/types/user.type";
import logger from "../../config/logger";
import jwt from "jsonwebtoken";

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
    (existingOTP.otp = hashedOtp), (existingOTP.otpExpiresAt = otpExpiresAt);
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
  const verify = await bcrypt.compare(otp, seller.otp);
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
      "Seller with this email already registered,please login to proceed"
    );
  }
  const verifiedUser = await OTPRegister.findOne({ email });
  if (!verifiedUser) {
    throw new AppErrorUtil(404, "User with this email not found");
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

export const login = async (data: any) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppErrorUtil(
      404,
      "The email or password you entered is incorrect"
    );
  }
  const verifyPass = user.password;
  const verify = bcrypt.compare(password, verifyPass ? verifyPass : "");
  if (!verify) {
    throw new AppErrorUtil(400, "The email or password you entered is correct");
  }
  const payload = {
    _id: user?._id,
    email: user?.email,
  };
  const secretKey = process.env.JWT_SECRET_KEY
    ? process.env.JWT_SECRET_KEY
    : "";
  const token = jwt.sign(payload, secretKey);
  return { verify, token };
};

export const forgetPassword = async (data: any) => {
  const { email, currentUrl } = data;

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppErrorUtil(404, "User with this email not found");
  } else {
    const payload = { _id: user._id, email: user.email };
    console.log("xxxxxx", payload);

    const secretKey = process.env.JWT_SECRET_KEY
      ? process.env.JWT_SECRET_KEY
      : "";

    const token = jwt.sign(payload, secretKey, {
      expiresIn: "1d",
    });
    console.log({ token: token });

    const emailSuccess = await sendMailService({
      email,
      token,
      subject: "Click the link below to reset password",
      currentUrl,
    });
    return { emailSuccess, token };
  }
};

export const resetPassword = async (data: any) => {
  const { newPassword, confirmPassword, token } = data;
  if (newPassword !== confirmPassword) {
    throw new AppErrorUtil(400, "Please confirm the correct password");
  }
  const secretKey = process.env.JWT_SECRET_KEY
    ? process.env.JWT_SECRET_KEY
    : "";
  const payload: any = jwt.verify(token, secretKey);
  const user = await User.findOne({
    _id: payload._id,
  });
  if (!user) {
    throw new AppErrorUtil(400, "Cannot find user");
  }
  user.password = await bcrypt.hash(newPassword, 10);
  const result = await user.save();
  return result;
};

export const test = async () => {
  let x = "aaa";
  return x;
};

export const registerUser = async (data: IregisterUser) => {
  const {
    name,
    email,
    pan,
    gst,
    bankName,
    accountNumber,
    accountHolderName,
    currentUrl,
  } = data;

  const user = new User({
    name,
    email,
    pan,
    gst,
    bankName,
    accountNumber,
    accountHolderName,
  });

  // const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // let hashedOtp = bcrypt.hash(otp, 10);
  // mailService.sendOTP({ email, otp }).then((data) => {
  //   logger.info(`verification otp sent to ${email}`);
  // });

  const result = await user.save();
  const token = jwt.sign(
    { payload: { id: result.id } },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "1w",
    }
  );
  const registerUrl = `${currentUrl}/user/set-password/?token=${token}`;
  mailService
    .registerMail({ email, registerUrl })
    .then(() => {
      logger.info(`register set-password sent to ${email}`);
    })
    .catch((error) => {
      console.log({ error });
      logger.error("error in sending email");
    });
  return result;
};

export const verifyForPassword = async (data: any) => {
  let a = data;
};
