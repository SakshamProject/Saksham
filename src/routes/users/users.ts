import express, {Request, Response, Router} from "express";
import { pingDB } from "../../services/database/database.js";
import { getUser } from "../../../controllers/users/users.js";
const userRouter = express.Router();
userRouter.get("/", getUser); 