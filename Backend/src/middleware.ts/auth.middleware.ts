import User from "../models/user.model";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    
    return res.status(401).json({ message: "Access Token Required" });
  }

 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const uid = decoded.id;
  


    const user = await User.findById(uid);
  

    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user; // ✅ Attach full user object to req
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyUser;