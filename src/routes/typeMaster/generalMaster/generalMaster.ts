import express from "express";
import educationalQualificationRouter from "./educationalQualification.js";
import serviceTypeRouter from "./serviceType.js";
import disabilityTypeRouter from "./disabilityType.js";

const generalMasterRouter = express.Router();

generalMasterRouter.use("/education-qualification", educationalQualificationRouter)
generalMasterRouter.use("/servicetype",serviceTypeRouter)
generalMasterRouter.use("/disabilitytype",disabilityTypeRouter)


export default generalMasterRouter;
