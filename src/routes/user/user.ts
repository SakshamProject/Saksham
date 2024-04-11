import {Router} from 'express'
import { getUser, getUserById } from '../../controllers/user/get.js'
import {postUser} from "../../controllers/user/post.js";
import fileHandler from "../../middlewares/fileHandler/fileHandler.js";
import {authenticate} from "../../middlewares/auth/auth.js";

const userRouter = Router();
userRouter.get("/", getUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", authenticate, fileHandler.single("profile-photo"), postUser);
export default userRouter;