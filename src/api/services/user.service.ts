import { OTP } from "../models/registerOtp.model";
import { User } from "../models/user.model";
import { AppError } from "../utils/appError";
import { transporter } from "./mail.service";

export const createUser = async (data: any) => {
  let result: any;
  const { email } = data;
  const existingSeller = await User.findOne({ email });
  if (existingSeller) {
    throw new AppError(400, "Seller with this email already exist");
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date();
  otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 1);

  const mailOptions = {
    from: "alishkarki220@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Your OTP for email verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, async (error) => {
    if (error) {
      throw new AppError(400, "error.message");
    }
  });
  const existingOTP = await OTP.findOne({ email });
  if (existingOTP) {
    (existingOTP.OTP = otp), (existingOTP.otpExpiredAt = otpExpiresAt);
    result = existingOTP.save();
    return result;
  } else {
    const registerOTP = new OTP({
      email: email,
      otpExpiredAt: otpExpiresAt,
      OTP: otp,
    });

    result = await registerOTP.save();
    return result;
  }
};

export const test = async () => {
  let x = "aaa";
  return x;
};
