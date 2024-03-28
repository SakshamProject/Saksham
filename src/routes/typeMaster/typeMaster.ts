import express from "express";
import stateMasterRouter from "./stateMaster/stateMaster.js";
import generalMasterRouter from "./generalMaster/generalMaster.js";

const typeMasterRouter = express.Router();

typeMasterRouter.use("/statemaster", stateMasterRouter);
typeMasterRouter.use("/generalmaster", generalMasterRouter);

export default typeMasterRouter;
