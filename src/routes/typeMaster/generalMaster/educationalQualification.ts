import express from "express";
import { getEducationalQualification, getEducationalQualificationById, getEducationQualificationByEducationQualificationTypeId } from "../../../controllers/typeMaster/generalMaster/educationalQualification/get.js";
import { postEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/post.js";
import { deleteEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/delete.js";
import { putEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/put.js";


const educationalQualificationRouter = express.Router();

educationalQualificationRouter.get("/", getEducationalQualification);
educationalQualificationRouter.get("/:id", getEducationalQualificationById);
educationalQualificationRouter.post("/", postEducationQualificationType);
educationalQualificationRouter.put("/:id", putEducationQualificationType);
educationalQualificationRouter.delete("/:id", deleteEducationQualificationType);
educationalQualificationRouter.get("/services/:educationQualificationTypeId",getEducationQualificationByEducationQualificationTypeId);

export default educationalQualificationRouter;