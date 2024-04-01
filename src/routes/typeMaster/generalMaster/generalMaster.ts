import express from "express";
import districtRouter from "./district.js";
import stateRouter from "./state.js";

const generalMasterRouter = express.Router();
generalMasterRouter.use("/states", stateRouter);
generalMasterRouter.use("/districts", districtRouter);

export default generalMasterRouter;
