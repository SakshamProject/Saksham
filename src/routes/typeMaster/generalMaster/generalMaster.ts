import express, { NextFunction, Request, Response } from "express";
import educationalQualificationRouter from "./educationalQualification.js";
import disabilityTypeRouter from "./disabilityType.js";
import prisma from "../../../services/database/database.js";
import { createResponseOnlyData } from "../../../types/createResponseSchema.js";
import serviceTypeRouter from "./serviceType.js";
import { communityCategoryRouter } from "./communityCategory.js";
import districtRouter from "./district.js";
import stateRouter from "./state.js";
import { getGeneralMaster } from "../../../controllers/typeMaster/generalMaster/get.js";

const generalMasterRouter = express.Router();

generalMasterRouter.use(
  "/education-qualification",
  educationalQualificationRouter
);
generalMasterRouter.use("/servicetype", serviceTypeRouter);
generalMasterRouter.use("/disabilitytype", disabilityTypeRouter);
generalMasterRouter.get(
  "/generalmasterseed",
getGeneralMaster
);
generalMasterRouter.use("/communitycategory", communityCategoryRouter);
generalMasterRouter.use("/states", stateRouter);
generalMasterRouter.use("/districts", districtRouter);
export default generalMasterRouter;
