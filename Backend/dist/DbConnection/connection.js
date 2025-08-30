"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection = async () => {
    dotenv_1.default.config();
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully");
    }
    catch (error) {
        console.error("Database connection failed:", error);
    }
};
exports.default = dbConnection;
