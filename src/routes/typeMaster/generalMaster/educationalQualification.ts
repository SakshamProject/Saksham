import express from "express";
import { getEducationalQualification } from "../../../controllers/typeMaster/generalMaster/get.js";
import { postEducationalQualification } from "../../../controllers/typeMaster/generalMaster/post.js";

const educationalQualificationRouter = express.Router()
educationalQualificationRouter.get("/", getEducationalQualification)
educationalQualificationRouter.post("/", postEducationalQualification)

export default educationalQualificationRouter