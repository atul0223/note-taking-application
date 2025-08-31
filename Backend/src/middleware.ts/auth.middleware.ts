import User from "../models/user.model";
import jwt from "jsonwebtoken";

const verifyUser = async (req:any, res:any, next:any) => {
  const token = req.cookies?.token;

  if (!token) {
    
    return res.status(401).json({ message: "Access Token Required" });
  }

 

  try {
    if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}


    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }
    if (typeof decoded === "string") {
  throw new Error("Unexpected token format: string");
}

  
    const uid = decoded.id;
  


    const user = await User.findById(uid);
  

    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user; // ✅ Attach full user object to req
    next();
  } catch (err:any) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyUser;