"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Access Token Required" });
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = await user_model_1.default.findById(decodedToken.id);
    if (!user) {
        return res.status(401).json({ message: "Invalid Access Token" });
    }
    req.user = user;
    next();
};
exports.default = verifyUser;
