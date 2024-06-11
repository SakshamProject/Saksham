import express from "express";
import {
  getState,
  getStateById,
} from "../../../controllers/typeMaster/generalMaster/state/get.js";
import { postState } from "../../../controllers/typeMaster/generalMaster/state/post.js";
import { deleteState } from "../../../controllers/typeMaster/generalMaster/state/delete.js";
import { updateState } from "../../../controllers/typeMaster/generalMaster/state/put.js";
import authorization from "../../../middlewares/authentication/authorization.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../../types/authentication/authorizationEnum.js";

const stateRouter = express.Router();

stateRouter.get(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getState
);
stateRouter.post("/", authorization(AuthorizationEnum.TYPE_MASTERS), postState);
stateRouter.get(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getStateById
);
stateRouter.delete(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  deleteState
);
stateRouter.put(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  updateState
);

export default stateRouter;
