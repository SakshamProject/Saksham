import express, {Request, Response, Router} from "express";
import { pingDB } from "../../services/database/database.js";
import { GetRequestParser, getUser } from "../../../controllers/users/users.js";
const userRouter = express.Router();
userRouter.get("/", GetRequestParser,getUser); 
export default userRouter;
