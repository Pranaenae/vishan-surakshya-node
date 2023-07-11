import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  auth: {
    user: "alishkarki220@gmail.com",
    pass: "qxtgzzpyonoubwfc",
  },
});

// module.exports = {
//   transporter
// };
