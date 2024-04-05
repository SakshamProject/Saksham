import express from "express";
import generalMasterRouter from "./generalMaster/generalMaster.js";

const typeMasterRouter = express.Router();


typeMasterRouter.use("/generalmaster", generalMasterRouter);


export default typeMasterRouter;
