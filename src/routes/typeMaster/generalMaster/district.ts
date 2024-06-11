import express from "express";
import { postDistrict } from "../../../controllers/typeMaster/generalMaster/district/post.js";
import {
  getDistrict,
  getDistrictById,
} from "../../../controllers/typeMaster/generalMaster/district/get.js";
import { deleteDistrict } from "../../../controllers/typeMaster/generalMaster/district/delete.js";
import { updateDistrict } from "../../../controllers/typeMaster/generalMaster/district/update.js";
import { getSevaKendraByDistrictId } from "../../../controllers/sevaKendra/get.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../../types/authentication/authorizationEnum.js";
import authorization from "../../../middlewares/authentication/authorization.js";

const districtRouter = express.Router();
districtRouter.post(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  postDistrict
);
districtRouter.get(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS,MethodsEnum.DIVYANG_DROPDOWN),
  getDistrict
);
districtRouter.get(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getDistrictById
);
districtRouter.delete(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  deleteDistrict
);
districtRouter.put(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  updateDistrict
);
districtRouter.get(
  "/:districtId/sevakendras",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getSevaKendraByDistrictId
);
export default districtRouter;
