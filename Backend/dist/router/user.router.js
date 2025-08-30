"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const notes_controller_1 = require("../controllers/notes.controller");
const auth_middleware_1 = __importDefault(require("../middleware.ts/auth.middleware"));
const router = (0, express_1.Router)();
router.route("/SignIn").post(user_controller_1.signIn);
router.route("/login").post(user_controller_1.login);
router.route("/verifyOtp").post(user_controller_1.verifyOtp);
router.route("/getUser").get(auth_middleware_1.default, (req, res) => {
    res.status(200).json({ user: { name: req.user.username, email: req.user.email } });
});
router.route("/getNotes").get(auth_middleware_1.default, notes_controller_1.getNotes);
router.route("/createNote").post(auth_middleware_1.default, notes_controller_1.createNote);
router.route("/deleteNote/:id").delete(auth_middleware_1.default, notes_controller_1.deleteNote);
router.post("/signout", (req, res) => {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ message: "No token provided" });
    // Invalidate the token (implementation depends on your auth strategy)
    res.clearCookie("token");
    return res.status(200).json({ message: "Signout successful" });
});
exports.default = router;
