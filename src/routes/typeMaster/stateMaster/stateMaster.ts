import express from "express";
import stateRouter from "../generalMaster/state.js";
import districtRouter from "../generalMaster/district.js";

const stateMasterRouter = express.Router();

stateMasterRouter.use("/states", stateRouter);
stateMasterRouter.use("/districts", districtRouter);

export default stateMasterRouter;
