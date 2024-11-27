import { Router, Request, Response } from "express";
import viewProfileHanler from "./handlers/viewProfileHandler";
import friendHanler from "./handlers/friendHandler";
import userBioHanler from "./handlers/userBioHandler";
import PfpHanler from "./handlers/profilePicHandler";
import { signupHandler } from "./handlers/signupHandler";
import { loginHandler } from "./handlers/loginHandler";
import { authMiddleware } from "../middlewares/auth";

const userRouter: Router = Router();

// signup
userRouter.post("/signup", signupHandler)

// signin
userRouter.post("/signin", loginHandler)

// view own profile
userRouter.use("/viewProfile", authMiddleware, viewProfileHanler)

// friends
userRouter.use("/friends", authMiddleware, friendHanler)

// user Bio
userRouter.use("/bio", authMiddleware, userBioHanler)

// PFP
userRouter.use("/profilePicture", authMiddleware, PfpHanler)


export default userRouter;