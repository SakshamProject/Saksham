import express from "express";
import { getEducationQualificationType, getEducationQualificationTypeById, getEducationQualificationByEducationQualificationTypeId } from "../../../controllers/typeMaster/generalMaster/educationalQualification/get.js";
import { postEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/post.js";
import { deleteEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/delete.js";
import { putEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/put.js";


const educationalQualificationRouter = express.Router();

educationalQualificationRouter.get("/", getEducationQualificationType);
educationalQualificationRouter.get("/:id", getEducationQualificationTypeById);
educationalQualificationRouter.post("/", postEducationQualificationType);
educationalQualificationRouter.put("/:id", putEducationQualificationType);
educationalQualificationRouter.delete("/:id", deleteEducationQualificationType);
educationalQualificationRouter.get("/services/:educationQualificationTypeId",getEducationQualificationByEducationQualificationTypeId);

export default educationalQualificationRouter;