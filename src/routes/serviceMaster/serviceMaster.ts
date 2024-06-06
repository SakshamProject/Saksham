import { Router } from "express";
import {
  getServiceByID,
  getServices,
} from "../../controllers/serviceMaster/get.js";
import { deleteService } from "../../controllers/serviceMaster/delete.js";
import {
  postService,
  filterService,
  listService,
} from "../../controllers/serviceMaster/post.js";
import { putService } from "../../controllers/serviceMaster/put.js";
import authorization from "../../middlewares/authentication/authorization.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../types/authentication/authorizationEnum.js";

const serviceMasterRouter: Router = Router();

serviceMasterRouter.post(
  "/",
  authorization(AuthorizationEnum.SERVICE_MASTER),
  postService
);
serviceMasterRouter.get(
  "/",
  authorization(AuthorizationEnum.SERVICE_MASTER, MethodsEnum.DIVYANG_DROPDOWN),
  getServices
);
serviceMasterRouter.put(
  "/:serviceID",
  authorization(AuthorizationEnum.SERVICE_MASTER),
  putService
);
serviceMasterRouter.get(
  "/:serviceID",
  authorization(AuthorizationEnum.SERVICE_MASTER),
  getServiceByID
);
serviceMasterRouter.delete(
  "/:serviceID",
  authorization(AuthorizationEnum.SERVICE_MASTER),
  deleteService
);
// serviceMasterRouter.post(
//   "/filter",
//   authorization(AuthorizationEnum.SERVICE_MASTER),
//   filterService
// );
serviceMasterRouter.post(
  "/list",
  authorization(AuthorizationEnum.SERVICE_MASTER),
  listService
);

export default serviceMasterRouter;
