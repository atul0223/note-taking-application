"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.login = exports.signIn = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jwtgenerator_1 = __importDefault(require("../utils/jwtgenerator"));
const sendOtp_1 = __importDefault(require("../utils/sendOtp"));
const signIn = async (req, res) => {
    const { username, email, dob } = req.body;
    if ([username, email, dob].some(f => f?.length === 0)) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const emailExists = await user_model_1.default.findOne({ email });
    if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await user_model_1.default.create({ username, email, dob });
    await (0, sendOtp_1.default)(email);
    return res.status(201).json({ message: "verify through otp" });
};
exports.signIn = signIn;
const login = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "please provide email" });
    }
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    await (0, sendOtp_1.default)(email);
    return res.status(200).json({ message: "otp sent successfully" });
};
exports.login = login;
const verifyOtp = async (req, res) => {
    const { email, otp, keepLoggedIn } = req.body;
    if (![email, otp].every(Boolean)) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await user_model_1.default.findOne({ email });
    if (user?.otp === null) {
        return res.status(423).json({ message: "OTP send first" });
    }
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (user.otp.toString() !== otp.toString()) {
        return res.status(400).json({ message: "Invalid OTP" });
    }
    user.otp = null;
    const token = (0, jwtgenerator_1.default)(user, keepLoggedIn ? "7d" : "30m");
    await user.save();
    return res
        .cookie("token", token, { httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: keepLoggedIn ? 30 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000, // 30 days or 30 minutes
    })
        .status(200).json({ message: "OTP verified successfully" });
};
exports.verifyOtp = verifyOtp;
