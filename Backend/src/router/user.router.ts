import { Router } from "express";
import { login, signIn, verifyOtp } from "../controllers/user.controller";
import { createNote, deleteNote, getNotes } from "../controllers/notes.controller";
import verifyUser from "../middleware.ts/auth.middleware";
const router = Router()
router.route("/SignIn").post(signIn)
router.route("/login").post(login);
router.route("/verifyOtp").post(verifyOtp);
router.route("/getNotes").get(verifyUser,getNotes);
router.route("/createNote").post(verifyUser,createNote);
router.route("/deleteNote/:id").delete(verifyUser,deleteNote);  
router.post("/signout",(req,res)=>{
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: "No token provided"});
    // Invalidate the token (implementation depends on your auth strategy)
    res.clearCookie("token");
    return res.status(200).json({message: "Signout successful"});
})
export default router;