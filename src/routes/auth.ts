import express, { NextFunction, Request, Response, Router } from "express";
import userLogin from "../controllers/authentication/userLogIn.js";
import userLogout from "../controllers/authentication/userLogout.js";
import divyangLogin from "../controllers/authentication/divyangLogin.js";
import divyangLogout from "../controllers/authentication/divyangLogout.js";
import { postDivyangDetails } from "../controllers/divyangDetails/post.js";
const authRouter = Router();

authRouter.use(express.json());

authRouter.post("/divynag/login",divyangLogin);
authRouter.post("/divynag/signup",postDivyangDetails );
authRouter.post("/divyang/logout",divyangLogout)
authRouter.post("/user/login", userLogin);
authRouter.post("/user/logout", userLogout);

export default authRouter;
