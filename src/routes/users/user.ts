import {Router} from 'express'
import { getUser, getUserById } from '../../controllers/users/get.js'
import {postUser} from "../../controllers/users/post.js";
import fileHandler from "../../middlewares/fileHandler/fileHandler.js";
import {authenticate} from "../../middlewares/auth/auth.js";

const userRouter = Router();
userRouter.get("/", getUser);
userRouter.get("/:userId", getUserById);
userRouter.post("/", authenticate, fileHandler.single("profile-photo"), postUser);
// userRouter.post("/", authenticate, postUser);
export default userRouter;