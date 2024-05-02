import { Router } from "express";
import { postServiceMapping } from "../../controllers/serviceMapping/post.js";
import {
  getServiceMapping,
  getServiceMappingById,
} from "../../controllers/serviceMapping/get.js";
import { putServiceMapping } from "../../controllers/serviceMapping/put.js";
import authorization from "../../middlewares/authentication/authorization.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../types/authentication/authorizationEnum.js";

const serviceMappingRouter = Router();

serviceMappingRouter.post(
  "/",
  authorization(AuthorizationEnum.SERVICE_MAPPING, MethodsEnum.POST),
  postServiceMapping
);
serviceMappingRouter.put(
  "/:id",
  authorization(AuthorizationEnum.SERVICE_MAPPING),
  putServiceMapping
);
serviceMappingRouter.get(
  "/:id",
  authorization(AuthorizationEnum.SERVICE_MAPPING),
  getServiceMappingById
);
serviceMappingRouter.post(
  "/list",
  authorization(AuthorizationEnum.SERVICE_MAPPING),
  getServiceMapping
);

export default serviceMappingRouter;
