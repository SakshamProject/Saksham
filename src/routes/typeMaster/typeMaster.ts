import express from "express";
import {
  getDistrict,
  getDistrictById,
  getState,
  getStateById,
} from "../../controllers/typeMaster/get.js";
import { postDistrict, postState } from "../../controllers/typeMaster/post.js";
import {
  deleteDistrict,
  deleteState,
} from "../../controllers/typeMaster/delete.js";
import {
  updateDistrict,
  updateState,
} from "../../controllers/typeMaster/update.js";
import stateMasterRouter from "./stateMaster.js";

const typeMasterRouter = express.Router();

typeMasterRouter.use("/statemaster", stateMasterRouter);

typeMasterRouter.get("/states", getState);
typeMasterRouter.post("/states", postState);
typeMasterRouter.get("/states/:id", getStateById);
typeMasterRouter.delete("/states/:id", deleteState);
typeMasterRouter.put("/states/:id", updateState);

typeMasterRouter.post("/districts", postDistrict);
typeMasterRouter.get("/districts", getDistrict);
typeMasterRouter.get("/districts/:id", getDistrictById);
typeMasterRouter.delete("/districts/:id", deleteDistrict);
typeMasterRouter.put("districts/:id", updateDistrict);
export default typeMasterRouter;
