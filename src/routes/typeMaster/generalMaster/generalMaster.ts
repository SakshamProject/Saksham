import express from "express";
import educationalQualificationRouter from "./educationalQualification.js";
import serviceTypeRouter from "./serviceType.js";

const generalMasterRouter = express.Router();

generalMasterRouter.use("/educationalQualification", educationalQualificationRouter)
generalMasterRouter.use("/servicetype",serviceTypeRouter)


export default generalMasterRouter;
