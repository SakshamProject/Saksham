import express from "express";
import {
  getDistrict,
  getState,
  getStateById,
} from "../../controllers/typeMaster/get.js";
import { postDistrict, postState } from "../../controllers/typeMaster/post.js";
import { deleteState } from "../../controllers/typeMaster/delete.js";
import { updateState } from "../../controllers/typeMaster/update.js";

const typeMasterRouter = express.Router();
typeMasterRouter.get("/states", getState);
typeMasterRouter.post("/states", postState);
typeMasterRouter.get("/states/:id", getStateById);
typeMasterRouter.delete("/states", deleteState);
typeMasterRouter.put("/states", updateState);

typeMasterRouter.post("/districts", postDistrict);
typeMasterRouter.get("/districts", getDistrict);
export default typeMasterRouter;
