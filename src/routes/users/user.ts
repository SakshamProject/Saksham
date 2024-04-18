import {Router} from 'express'
import { getUserById } from '../../controllers/users/get.js'
import {listUser, postUser} from "../../controllers/users/post.js";
import fileHandler from "../../middlewares/fileHandler/fileHandler.js";
import {authenticate} from "../../middlewares/authentication/authentication.js";
import { putUser } from '../../controllers/users/put.js';

const userRouter = Router();
// userRouter.post("/", getUsers); list of all user id's and names
userRouter.post("/list", listUser);
userRouter.get("/:userId", getUserById);
userRouter.post("", authenticate, fileHandler.single("profilePhoto"), postUser);
userRouter.put("/:id", authenticate, fileHandler.single("profilePhoto"), putUser);
export default userRouter;