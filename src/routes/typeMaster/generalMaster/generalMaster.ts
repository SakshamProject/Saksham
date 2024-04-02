import express from "express";
import educationalQualificationRouter from "./educationalQualification.js";
import { communityCategoryRouter } from "./CommunityCategory.js";

const generalMasterRouter = express.Router();

generalMasterRouter.use("/educationalQualification", educationalQualificationRouter)
generalMasterRouter.use("/community-category", communityCategoryRouter)

export default generalMasterRouter;
