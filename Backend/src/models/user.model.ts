import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  otp: { type: Number },
  
});

const User = mongoose.model("User", userSchema);

export default User;
