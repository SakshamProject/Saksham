import express, { NextFunction, Request, Response, Router } from "express";
import userLogin from "../controllers/authentication/userLogIn.js";
import userLogout from "../controllers/authentication/userLogout.js";
const authRouter = Router();

authRouter.use(express.json());

//authRouter.post("/divynag/login",divyangDetailsRouter);
//authRouter.post("/divynag/signup", );
//authRouter.post("/divyang/logout")
authRouter.post("/user/login", userLogin);
authRouter.post("/user/logout", userLogout);

export default authRouter;
