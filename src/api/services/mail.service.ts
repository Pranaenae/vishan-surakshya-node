import { transporter } from "../../config/mail";
import AppErrorUtil from "../utils/appError";
import { IEmailOptions } from "../utils/types/mail.type";

export const sendMailService = async ({
  email,
  subject,
  token,
  currentUrl,
}: IEmailOptions) => {
  const link = `${currentUrl}/authentication/sign-in/?token=${token}`;
  console.log({ link });
  const mailOptions = {
    from: `taskmanagementsystem@gmail.com`,
    to: email,
    subject: subject,
    text: `Password Reset Link: ${link}`,
    // html: `
    //   <body>
    //   <h3>Please click on the link below to reset your password.</h3><br/>
    //   <p>
    //   <a href="${link}"> ${link}</a>
    //   </p>
    //    </body>`,
  };

  try {
    const mailsent = await transporter.sendMail(mailOptions);
    if (mailsent) {
      return true;
    }
  } catch (error) {
    console.log("><><><><><><><><>< Mail Error  ><><><><><><><><><", error);
    throw new AppErrorUtil(400, "Couldn't send mail");
  }
};

export const sendOTP = async ({ email, otp }: IEmailOptions) => {
  const mailOptions = {
    from: `test@gmail.com`,
    to: email,
    subject: "OTP for email verification",
    text: `OTP for email verification is ${otp}`,
  };

  try {
    const mailsent = await transporter.sendMail(mailOptions);
    if (mailsent) {
      return true;
    }
  } catch (error) {
    throw new AppErrorUtil(400, "Couldn't send mail");
  }
};

export const registerMail = async ({
  email,
  registerUrl,
  password,
}: IEmailOptions) => {
  const mailOptions = {
    from: `test@gmail.com`,
    to: email,
    subject: "Password for account verification",
    text: `${password} is your password,Please click the link to set password and verify your account : ${registerUrl}`,
  };
  try {
    const mailsent = await transporter.sendMail(mailOptions);
    if (mailsent) {
      return true;
    }
  } catch (error) {
    throw new AppErrorUtil(400, "Couldn't send mail. Please try again.");
  }
};
