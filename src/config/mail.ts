import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const smtpConfig = {
  host: "smtp.gmail.com",
  port: process.env.MAIL_PORT,
  secure: true, // true for 465, false for other ports
  service: "gmail",
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

//extra
// import nodemailer from 'nodemailer';
// const transporter = nodemailer.createTransport({
//     host:"smtp.gmail.com",
//     port:465,
//     service :"gmail",
//    auth: {
//     user: "alishkarki220@gmail.com",
//     pass: "qxtgzzpyonoubwfc",

//     }
// })
// export const mailSender = async(email:String,token:String,host:String)=>{
//     try{
//     const mailOptions = {
//         from:'alishkarki220@gmail.com',
//         to:email,
//         subject:""
//     }

//     }catch(err){

//     }
