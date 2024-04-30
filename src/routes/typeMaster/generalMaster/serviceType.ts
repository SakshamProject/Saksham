import express from "express";
import {
  getServiceByServiceTypeId,
  getServiceType,
  getServiceTypeById,
} from "../../../controllers/typeMaster/generalMaster/serviceType/get.js";
import { postServiceType } from "../../../controllers/typeMaster/generalMaster/serviceType/post.js";
import { deleteServiceType } from "../../../controllers/typeMaster/generalMaster/serviceType/delete.js";
import { putServiceType } from "../../../controllers/typeMaster/generalMaster/serviceType/put.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../../types/authentication/authorizationEnum.js";
import authorization from "../../../middlewares/authentication/authorization.js";

const serviceTypeRouter = express.Router();

serviceTypeRouter.get(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getServiceType
);
serviceTypeRouter.get(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  getServiceTypeById
);
serviceTypeRouter.post(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  postServiceType
);
serviceTypeRouter.put(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  putServiceType
);
serviceTypeRouter.delete(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  deleteServiceType
);
serviceTypeRouter.get(
  "/services/:serviceTypeId",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getServiceByServiceTypeId
);

export default serviceTypeRouter;
