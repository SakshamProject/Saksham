import express from 'express'
import {postUser} from "../../controllers/users/post.js";
const userRouter = express.Router();
userRouter.post("/", postUser);
export default userRouter