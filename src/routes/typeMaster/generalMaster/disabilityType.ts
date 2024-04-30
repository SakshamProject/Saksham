import express from "express";
import {
  getDisabilitySubTypeByDisabilityTypeId,
  getDisabilityType,
  getDisabilityTypeById,
} from "../../../controllers/typeMaster/generalMaster/disabilityType/get.js";
import { postDisabilityType } from "../../../controllers/typeMaster/generalMaster/disabilityType/post.js";
import { deleteDisabilityType } from "../../../controllers/typeMaster/generalMaster/disabilityType/delete.js";
import { putDisabilityType } from "../../../controllers/typeMaster/generalMaster/disabilityType/put.js";
import authorization from "../../../middlewares/authentication/authorization.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../../types/authentication/authorizationEnum.js";

const disabilityTypeRouter = express.Router();

disabilityTypeRouter.get(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getDisabilityType
);
disabilityTypeRouter.get(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  getDisabilityTypeById
);
disabilityTypeRouter.post(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  postDisabilityType
);
disabilityTypeRouter.put(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  putDisabilityType
);
disabilityTypeRouter.delete(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  deleteDisabilityType
);
disabilityTypeRouter.get(
  "/disabilitysubtypes/:disabilityTypeId",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getDisabilitySubTypeByDisabilityTypeId
);

export default disabilityTypeRouter;
