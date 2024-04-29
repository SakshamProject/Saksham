import express from "express";
import {
  getSevaKendra,
  getSevaKendraById,
} from "../../controllers/sevaKendra/get.js";
import putSevaKendra from "../../controllers/sevaKendra/put.js";
import postSevaKendra from "../../controllers/sevaKendra/post.js";
import { getUsersBySevaKendra } from "../../controllers/users/get.js";
import { getDesignationsBySevaKendraId } from "../../controllers/designation/get.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../types/authentication/authorizationEnum.js";
import authorization from "../../middlewares/authentication/authorization.js";

const sevaKendraRouter = express.Router();

sevaKendraRouter.post(
  "/list/",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  getSevaKendra
);

sevaKendraRouter.get(
  "/:id",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  getSevaKendraById
);
sevaKendraRouter.post(
  "/",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  postSevaKendra
);
sevaKendraRouter.put(
  "/:id",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP),
  putSevaKendra
);
sevaKendraRouter.get(
  "/:id/users",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP, MethodsEnum.USER_DROPDOWN),
  getUsersBySevaKendra
);
sevaKendraRouter.get(
  "/:id/designations",
  authorization(AuthorizationEnum.SEVAKENDRA_SETUP, MethodsEnum.USER_DROPDOWN),
  getDesignationsBySevaKendraId
);

// sevaKendraRouter.get("/districts/:districtId", getSevaKendraByDistrictId);

export default sevaKendraRouter;
