import jwt from "jsonwebtoken";
const generateJWT = (user:any, time:any ) => {
  if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}


  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: time }
  );
};
export default generateJWT;