import express, {NextFunction, Request, Response, Router} from "express";
import login from "../controllers/users/authentication/logIn.js";
import logout from "../controllers/users/authentication/logout.js";
const authRouter = Router();

authRouter.use(express.json());

//authRouter.post("/divynag/login",divyangDetailsRouter);
//authRouter.post("/divynag/signup", );
authRouter.post("/user/login", login);
authRouter.post("/user/logout", logout);

export default authRouter;