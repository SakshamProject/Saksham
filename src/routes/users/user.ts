import {Router} from 'express'
import { getUserById } from '../../controllers/users/get.js'
import {listUser, postUser} from "../../controllers/users/post.js";
import fileHandler from "../../middlewares/fileHandler/fileHandler.js";
import {authenticate} from "../../middlewares/auth/auth.js";

const userRouter = Router();
userRouter.post("/list", listUser);
userRouter.get("/:userId", getUserById);
userRouter.post("/", authenticate, fileHandler.single("profile-photo"), postUser);
// userRouter.post("/", authenticate, postUser);
export default userRouter;