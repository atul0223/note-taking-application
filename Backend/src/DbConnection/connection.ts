import mongoose from "mongoose";
import dotenv from "dotenv";
const dbConnection = async () => {
    dotenv.config();
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default dbConnection;
