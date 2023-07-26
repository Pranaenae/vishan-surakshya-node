// import { OTPRegister } from "../models/registerOtp.model";
import { User } from "../entity/user.entity";
import AppErrorUtil from "../utils/appError";
import { mailService } from "./index.service";
import { sendMailService, sendOTP } from "./mail.service";
import bcrypt from "bcrypt";
import { IregisterUser } from "../utils/types/user.type";
import logger from "../../config/logger";
import jwt from "jsonwebtoken";
import datasource from "../../config/ormConfig";

const userRepositoy = datasource.getRepository(User);

// export const sendEmail = async (data: any) => {
//   let result: any;
//   const { email } = data;
//   const existingSeller = await userRepositoy.findOneBy({ email });
//   if (existingSeller) {
//     throw new AppErrorUtil(400, "Seller with this email already exist");
//   }
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   let hashedOtp = await bcrypt.hash(otp, 10);
//   const otpExpiresAt = new Date();
//   otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 1);

//   await mailService.sendOTP({ email, otp });
//   const existingOTP = await OTPRegister.findOne({ email });
//   if (existingOTP) {
//     (existingOTP.otp = hashedOtp), (existingOTP.otpExpiresAt = otpExpiresAt);
//     result = existingOTP.save();
//     return result;
//   } else {
//     const registerOTP = new OTPRegister({
//       email: email,
//       otpExpiresAt: otpExpiresAt,
//       OTP: hashedOtp,
//     });

//     result = await registerOTP.save();
//     return result;
//   }
// };

// export const verifyOTP = async (data: any) => {
//   const { email, otp } = data;
//   const seller = await OTPRegister.findOne({ email });
//   if (!seller) {
//     throw new AppErrorUtil(404, "Seller with this email not found");
//   }
//   if (new Date() > seller.otpExpiresAt) {
//     throw new AppErrorUtil(
//       400,
//       "OTP expired,please send another OTP to verify email"
//     );
//   }
// }
//   const verify = await bcrypt.compare(otp, seller.otp);
//   if (!verify) {
//     throw new AppErrorUtil(400, "Invalid OTP");
//   }
//   seller.isVerified = true;
//   const success = await seller.save();
//   return success;
// };

// export const register = async (data: any) => {
//   const { userName, email, password } = data;
//   const existingUser = await userRepositoy.findOneBy({ email });

//   if (existingUser) {
//     throw new AppErrorUtil(
//       400,
//       "Seller with this email already registered,please login to proceed"
//     );
//   }
//   const verifiedUser = await OTPRegister.findOne({ email });
//   if (!verifiedUser) {
//     throw new AppErrorUtil(404, "User with this email not found");
//   }
//   if (!verifiedUser?.isVerified) {
//     throw new AppErrorUtil(
//       400,
//       "Verify your email through OTP for registration"
//     );
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User();
//     newUser.userName=
//     email,
//     password: hashedPassword,
//   });
//   const result = await userRepositoy.save(newUser);
//   return result;
// };

export const login = async (data: any) => {
  const { email, password } = data;
  const user = await userRepositoy.findOneBy({ email });
  if (!user) {
    throw new AppErrorUtil(
      404,
      "The email or password you entered is incorrect"
    );
  }
  if (user.emailStatus === "unverified") {
    throw new AppErrorUtil(400, "Please verify your account through email76");
  }
  const verifyPass = user.password;
  console.log({ verifyPass });
  const verify = await bcrypt.compare(password, user.password!);
  console.log({ verify });
  if (!verify) {
    throw new AppErrorUtil(400, "The email or password you entered is correct");
  } else {
    const payload = {
      id: user.id,
      email: user.email,
    };
    console.log(payload);
    const secretKey = process.env.JWT_SECRET_KEY
      ? process.env.JWT_SECRET_KEY
      : "";
    const token = jwt.sign(payload, secretKey);
    return { verify, token };
  }
};

export const forgetPassword = async (data: any, origin: any) => {
  const { email } = data;

  const user = await userRepositoy.findOneBy({ email: email });
  if (!user) {
    throw new AppErrorUtil(404, "User with this email not found");
  } else {
    const payload = { _id: user.id, email: user.email };

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
      origin,
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
  const user = await userRepositoy.findOneBy({
    id: payload._id,
  });
  if (!user) {
    throw new AppErrorUtil(400, "Cannot find user");
  }
  user.password = await bcrypt.hash(newPassword, 10);
  const result = await userRepositoy.save(user);
  return result;
};

export const test = async () => {
  let x = "aaa";
  return x;
};

export const registerUser = async (data: IregisterUser, origin: any) => {
  const {
    name,
    email,
    pan,
    gst,
    userType,
    address,
    mobileNumber,
    bankName,
    accountNumber,
    accountHolderName,
  } = data;
  const existUser = await userRepositoy.findOne({ where: { email: email } });
  if (existUser) {
    throw new AppErrorUtil(
      400,
      "User with this email already registered,login to proceed"
    );
  }

  const password = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log({ hashedPassword });
  const user: any = new User();
  user.name = name;
  user.email = email;
  user.password = hashedPassword;
  user.pan = pan;
  user.gst = gst;
  user.userType = userType;
  user.address = address;
  user.mobileNumber = mobileNumber;
  user.bankName = bankName;
  user.accountNumber = accountNumber;
  user.accountHolderName = accountHolderName;

  const tempUser = await userRepositoy.save(user);

  // const user = await userRepositoy.create({
  //   name,
  //   email,
  //   pan,
  //   gst,
  //   password: hashedPassword,
  //   userType,
  //   address,
  //   mobileNumber,
  //   bankName,
  //   accountNumber,
  //   accountHolderName,
  // });
  // mailService.sendOTP({ email, otp }).then((data) => {
  //   logger.info(`verification otp sent to ${email}`);
  // });

  // const result = await user.save();
  const payload = {
    id: tempUser.id,
    email: tempUser.email,
  };
  console.log({ payload });
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY!);
  const registerUrl = `${origin}/set-password/?token=${token}`;
  mailService
    .registerMail({ email, registerUrl, password })
    .then(() => {
      logger.info(`register set-password sent to ${email}`);
    })
    .catch((error) => {
      console.log("error in sending email");
      logger.error({ error });
    });
  return { tempUser, token };
};

export const setPassword = async (data: any) => {
  const { oldPassword, newPassword, confirmPassword } = data;

  console.log({ pass: data.user.password });
  const verify = await bcrypt.compare(oldPassword, data.user.password);
  if (!verify) {
    throw new AppErrorUtil(400, "Invalid credentials");
  }
  if (newPassword != confirmPassword) {
    throw new AppErrorUtil(
      400,
      "your password doesnot match with confirmPassword"
    );
  }
  const existingUser = await userRepositoy.findOneBy({ id: data.user.id });
  if (!existingUser) {
    throw new AppErrorUtil(404, "User not found!");
  } else {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await datasource
      .createQueryBuilder()
      .update(User)
      .set({ password: hashedPassword, emailStatus: "verified" })
      .where("id = :id", { id: data.user.id })
      .execute();
    return result;
  }
};

export const getProfile = async (data: any) => {
  const { id } = data;
  const user = await userRepositoy.findOneBy({ id: id });
  return user;
};

export const update = async (data: any) => {
  const existinguser = await userRepositoy.findOneBy({ id: data.user.id });

  if (!existinguser) {
    throw new AppErrorUtil(400, "User not found");
  }
  if (data.body.name) existinguser.name = data.body.name;
  if (data.body.pan) existinguser.pan = data.body.pan;
  if (data.body.gst) existinguser.gst = data.body.gst;
  if (data.body.address) existinguser.address = data.body.address;
  if (data.body.mobileNumber)
    existinguser.mobileNumber = data.body.mobileNumber;
  if (data.body.bankName) existinguser.bankName = data.body.bankName;
  if (data.body.accountNumber)
    existinguser.accountNumber = data.body.accountNumber;
  if (data.body.accountHolderName)
    existinguser.accountHolderName = data.body.accountHolderName;
  const result = await userRepositoy.save(existinguser);

  return result;
};

export const verifyForPassword = async (data: any) => {
  let a = data;
};
