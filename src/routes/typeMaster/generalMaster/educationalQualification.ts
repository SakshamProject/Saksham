import express from "express";
import {
  getEducationQualificationType,
  getEducationQualificationTypeById,
  getEducationQualificationByEducationQualificationTypeId,
} from "../../../controllers/typeMaster/generalMaster/educationalQualification/get.js";
import { postEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/post.js";
import { deleteEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/delete.js";
import { putEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/put.js";
import {
  AuthorizationEnum,
  MethodsEnum,
} from "../../../types/authentication/authorizationEnum.js";
import authorization from "../../../middlewares/authentication/authorization.js";

const educationalQualificationRouter = express.Router();

educationalQualificationRouter.get(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS, MethodsEnum.DIVYANG_DROPDOWN),
  getEducationQualificationType
);
educationalQualificationRouter.get(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  getEducationQualificationTypeById
);
educationalQualificationRouter.post(
  "/",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  postEducationQualificationType
);
educationalQualificationRouter.put(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  putEducationQualificationType
);
educationalQualificationRouter.delete(
  "/:id",
  authorization(AuthorizationEnum.TYPE_MASTERS),
  deleteEducationQualificationType
);
// educationalQualificationRouter.get("/services/:educationQualificationTypeId",getEducationQualificationByEducationQualificationTypeId);

export default educationalQualificationRouter;
