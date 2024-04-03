import express from "express";
import { getEducationalQualification, getEducationalQualificationById } from "../../../controllers/typeMaster/generalMaster/educationalQualification/get.js";
import { postEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/post.js";
import { deleteEducationQualificationType } from "../../../controllers/typeMaster/generalMaster/educationalQualification/delete.js";


const educationalQualificationRouter = express.Router();

educationalQualificationRouter.get("/", getEducationalQualification);
educationalQualificationRouter.get("/:id", getEducationalQualificationById);
educationalQualificationRouter.post("/", postEducationQualificationType);
educationalQualificationRouter.put("/:id",);
educationalQualificationRouter.delete("/:id", deleteEducationQualificationType);

export default educationalQualificationRouter;