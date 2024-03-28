import express from "express";
import stateRouter from "./state.js";
import districtRouter from "./district.js";

const stateMasterRouter = express.Router();

stateMasterRouter.use("/states", stateRouter);
stateMasterRouter.use("/districts", districtRouter);

export default stateMasterRouter;
