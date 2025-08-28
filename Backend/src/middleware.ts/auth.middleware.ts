
import User from "../models/user.model";
import jwt from "jsonwebtoken";
const verifyUser = async (req, res, next) => {
 
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Access Token Required" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user;
    next();

};
export default verifyUser;
