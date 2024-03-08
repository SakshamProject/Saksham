import express, {Request, Response, Router} from "express";
import { pingDB } from "../../services/database/database.js";
import { AddUser, GetRequestParser, PostRequestParser, getUser } from "../../controllers/users/users.js";
const userRouter = express.Router();
userRouter.get("/", GetRequestParser, getUser); 
userRouter.post("/", PostRequestParser, AddUser);
export default userRouter;
