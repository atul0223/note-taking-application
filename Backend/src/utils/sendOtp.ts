import { BrevoClient } from "@getbrevo/brevo";
import dotenv from "dotenv";
import User from "../models/user.model";

dotenv.config();

const sendOtp = async (email: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not defined in environment variables");
  }

  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.EMAIL_USER;
  if (!senderEmail) {
    throw new Error(
      "BREVO_SENDER_EMAIL (or EMAIL_USER) is not defined in environment variables"
    );
  }

  const brevo = new BrevoClient({ apiKey });

  await brevo.transactionalEmails.sendTransacEmail({
    subject: "verification otp",
    sender: {
      name: process.env.BREVO_SENDER_NAME || "HD",
      email: senderEmail,
    },
    to: [{ email }],
    htmlContent: `<p>your otp for verification is:${otp}  This otp expires in 10 minuts.</p>`,
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