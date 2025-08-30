"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_model_1 = __importDefault(require("../models/user.model"));
const sendOtp = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer_1.default.createTransport({
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
    await user_model_1.default.findOneAndUpdate({ email }, {
        $set: {
            otp: otp,
        },
    });
};
exports.default = sendOtp;
