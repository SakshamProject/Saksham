import { Router } from "express";
import { postDesignation } from "../../controllers/designation/post.js";
import { authenticate } from "../../middlewares/authentication/authentication.js";
import {
  getDesignation,
  getDesignationById,
  getFeatures,
} from "../../controllers/designation/get.js";
import { deleteDesignation } from "../../controllers/designation/delete.js";
import { putDesignation } from "../../controllers/designation/put.js";
import authorization from "../../middlewares/authentication/authorization.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../types/authentication/authorizationEnum.js";

const designationRouter = Router();

designationRouter.get(
  "/features",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP, MethodsEnum.USER_DROPDOWN),
  getFeatures
);
designationRouter.post(
  "/list",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  getDesignation
);
designationRouter.get(
  "/:id",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  getDesignationById
);
designationRouter.post(
  "/",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  postDesignation
);
designationRouter.delete(
  "/:id",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  deleteDesignation
);
designationRouter.put(
  "/:id",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  putDesignation
);

export default designationRouter;
