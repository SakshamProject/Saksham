import express from "express";
import educationalQualificationRouter from "./educationalQualification.js";
import serviceTypeRouter from "./serviceType.js";
import { communityCategoryRouter } from "./communityCategory.js";

const generalMasterRouter = express.Router();

generalMasterRouter.use("/education-qualification", educationalQualificationRouter)
generalMasterRouter.use("/servicetype",serviceTypeRouter)
generalMasterRouter.use("/communitycategory", communityCategoryRouter)

export default generalMasterRouter;
