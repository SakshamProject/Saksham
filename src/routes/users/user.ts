import { Router } from "express";
import { getUserById } from "../../controllers/users/get.js";
import { listUser, postUser } from "../../controllers/users/post.js";
import fileHandler from "../../middlewares/fileHandler/fileHandler.js";
import { putUser } from "../../controllers/users/put.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../types/authentication/authorizationEnum.js";
import authorization from "../../middlewares/authentication/authorization.js";
import resetPassword from "../../controllers/authentication/resetPasssword.js";

const userRouter = Router();
userRouter.post(
  "/resetpassword",
  authorization(AuthorizationEnum.SEVAKENDRA_USERS, MethodsEnum.USER_DROPDOWN),
  resetPassword
);
userRouter.post(
  "/list",
  authorization(AuthorizationEnum.SEVAKENDRA_USERS),
  listUser
);
userRouter.get(
  "/:userId",
  authorization(AuthorizationEnum.SEVAKENDRA_USERS, MethodsEnum.USER_DROPDOWN),
  getUserById
);
userRouter.post(
  "",
  authorization(AuthorizationEnum.SEVAKENDRA_USERS),
  fileHandler.single("profilePhoto"),
  postUser
);
userRouter.put(
  "/:id",
  authorization(AuthorizationEnum.SEVAKENDRA_USERS),
  fileHandler.single("profilePhoto"),
  putUser
);
export default userRouter;
