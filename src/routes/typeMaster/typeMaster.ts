import express from "express";
import stateMasterRouter from "./stateMaster/stateMaster.js";

const typeMasterRouter = express.Router();

typeMasterRouter.use("/statemaster", stateMasterRouter);

export default typeMasterRouter;
