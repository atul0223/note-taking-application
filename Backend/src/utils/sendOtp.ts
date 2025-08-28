import nodemailer from "nodemailer";
import User from "../models/user.model";
const sendOtp = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: `"HD" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "verification otp",
    html: `<p>your otp for verification is:${otp}  This otp expires in 10 minuts.</p>`,
  });
  await User.findOneAndUpdate(
    { email },
    {
      $set: {
        otp: otp,
      },
    }
  );
};
export default sendOtp;