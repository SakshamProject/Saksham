import express, { NextFunction, Request, Response, Router } from "express";
import userLogin from "../controllers/authentication/userLogIn.js";
import userLogout from "../controllers/authentication/userLogout.js";
import divyangLogin from "../controllers/authentication/divyangLogin.js";
import divyangLogout from "../controllers/authentication/divyangLogout.js";
import { postDivyang } from "../controllers/divyangDetails/post.js";
const authRouter = Router();

authRouter.use(express.json());

authRouter.post("/divyang/login", divyangLogin);
authRouter.post("/divyang/signup", postDivyang);
authRouter.post("/divyang/logout", divyangLogout);
authRouter.post("/user/login", userLogin);
authRouter.post("/user/logout", userLogout);

export default authRouter;
