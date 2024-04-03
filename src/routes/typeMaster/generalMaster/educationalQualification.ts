import express from "express";
import { getEducationalQualification, getEducationalQualificationById } from "../../../controllers/typeMaster/generalMaster/educationalQualification/get.js";

const educationalQualificationRouter = express.Router();

educationalQualificationRouter.get("/",getEducationalQualification);
educationalQualificationRouter.get("/:id",getEducationalQualificationById);
educationalQualificationRouter.post("/",);
educationalQualificationRouter.put("/:id",);
educationalQualificationRouter.delete("/:id",);

export default educationalQualificationRouter;