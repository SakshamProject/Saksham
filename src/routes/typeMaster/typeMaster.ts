import express from "express";
import {
  getDistrict,
  getState,
  postDistrict,
  postState,
} from "../../controllers/typeMaster/typeMaster.js";

const typeMasterRouter = express.Router();
typeMasterRouter.get("/states", getState);
typeMasterRouter.post("/states", postState);
typeMasterRouter.post("/districts", postDistrict);
typeMasterRouter.get("/districts", getDistrict);
export default typeMasterRouter;
