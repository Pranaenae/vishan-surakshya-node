import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const smtpConfig = {
  host: "smtp.gmail.com",
  port: process.env.MAIL_PORT,
  secure: true, // true for 465, false for other ports
  tls: {
    rejectUnauthorized: false, // change this to true after uploading to https server
  },
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
};

//@ts-ignore
export const transporter = nodemailer.createTransport(smtpConfig);
