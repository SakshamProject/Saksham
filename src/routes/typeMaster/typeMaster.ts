import express from "express";
import { getDistrict, getState } from "../../controllers/typeMaster/get.js";
import { postDistrict, postState } from "../../controllers/typeMaster/post.js";

const typeMasterRouter = express.Router();
typeMasterRouter.get("/states", getState);
typeMasterRouter.post("/states", postState);
typeMasterRouter.post("/districts", postDistrict);
typeMasterRouter.get("/districts", getDistrict);
export default typeMasterRouter;
