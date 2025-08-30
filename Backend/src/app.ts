import express, { json, urlencoded } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import userRouter from "./router/user.router";
const app: express.Application = express()
app.use(cors({ origin: "https://note-taking-application-steel.vercel.app", credentials: true }));
app.use(json({ limit: "20kb" }));
app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: "20kb" }));
app.use("/user",userRouter)
export default app;