import {Router} from 'express'
import { getUser, getUserById } from '../../controllers/user/get.js'
import {postUser} from "../../controllers/user/post.js";

const userRouter = Router()
userRouter.get("/", getUser)
userRouter.get("/:id",getUserById)
userRouter.post("/", postUser);
export default userRouter;