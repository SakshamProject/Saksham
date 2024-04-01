import express from "express";
import CorporationRouter from "./corporation.js";
import MLAConstituencyRouter from "./MLAConstituency.js";
import MPConstituencyRouter from "./MPConstituency.js";
import MunicipalityRouter from "./municipality.js";
import PanchayatUnionRouter from "./panchayatUnion.js";
import TalukRouter from "./taluk.js";
import TownPanchayatRouter from "./townPanchayat.js";

const stateMasterRouter = express.Router();

stateMasterRouter.use("/corporations", CorporationRouter);
stateMasterRouter.use("/mla-constituencies", MLAConstituencyRouter);
stateMasterRouter.use("/mp-constituencies", MPConstituencyRouter);
stateMasterRouter.use("/municipalities", MunicipalityRouter);
stateMasterRouter.use("/panchayat-unions", PanchayatUnionRouter);
stateMasterRouter.use("/taluks", TalukRouter);
stateMasterRouter.use("/town-panchayats", TownPanchayatRouter);

export default stateMasterRouter;
