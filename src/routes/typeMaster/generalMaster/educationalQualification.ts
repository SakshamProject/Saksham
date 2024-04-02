import express from "express";
import { getEducationalQualification, getEducationalQualificationById } from "../../../controllers/typeMaster/generalMaster/educationalQualification/get.js";
import { postEducationalQualification } from "../../../controllers/typeMaster/generalMaster/educationalQualification/post.js";

const educationalQualificationRouter = express.Router();

educationalQualificationRouter.get("/",getEducationalQualification);
educationalQualificationRouter.get("/:id",getEducationalQualificationById);
educationalQualificationRouter.post("/",postEducationalQualification);
educationalQualificationRouter.put("/:id",);
educationalQualificationRouter.delete("/:id",);



export default educationalQualificationRouter;