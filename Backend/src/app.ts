import express, { json, urlencoded } from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import userRouter from "./router/user.router";
const app: express.Application = express()
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(json({ limit: "20kb" }));
app.use(cookieParser());
app.use(urlencoded({ extended: true, limit: "20kb" }));
app.use("/user",userRouter)
export default app;