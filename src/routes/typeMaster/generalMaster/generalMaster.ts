import express from "express";
import educationalQualificationRouter from "./educationalQualification.js";

const generalMasterRouter = express.Router();

generalMasterRouter.use("/educationalQualification", educationalQualificationRouter)
generalMasterRouter.use()
generalMasterRouter.use()

export default generalMasterRouter;
