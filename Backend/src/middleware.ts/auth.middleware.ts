
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";


const verifyUser = async (req, res, next) => {
 interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Access Token Required" });
    }

const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;
const user = await User.findById(decodedToken._id);


    if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user;
    next();

};
export default verifyUser;
