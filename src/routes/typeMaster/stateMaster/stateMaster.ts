import express from "express";
import CorporationRouter from "./corporation.js";
import MLAConstituencyRouter from "./MLAConstituency.js";
import MPConstituencyRouter from "./MPConstituency.js";
import MunicipalityRouter from "./municipality.js";
import PanchayatUnionRouter from "./panchayatUnion.js";
import TalukRouter from "./taluk.js";
import TownPanchayatRouter from "./townPanchayat.js";

const stateMasterRouter = express.Router();

stateMasterRouter.use("/corporation", CorporationRouter);
stateMasterRouter.use("/mla-constituency", MLAConstituencyRouter);
stateMasterRouter.use("/mp-constituency", MPConstituencyRouter);
stateMasterRouter.use("/municipality", MunicipalityRouter);
stateMasterRouter.use("/panchayat-union", PanchayatUnionRouter);
stateMasterRouter.use("/taluk", TalukRouter);
stateMasterRouter.use("/town-panchayat", TownPanchayatRouter);

export default stateMasterRouter;
