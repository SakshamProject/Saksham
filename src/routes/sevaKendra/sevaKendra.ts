import express from "express";

import {
  getSevaKendra,
  getSevaKendraByDistrictId,
  getSevaKendraById,
} from "../../controllers/sevaKendra/get.js";
import putSevaKendra from "../../controllers/sevaKendra/put.js";
import postSevaKendra from "../../controllers/sevaKendra/post.js";

const sevaKendraRouter = express.Router();

sevaKendraRouter.post("/list/", getSevaKendra);
sevaKendraRouter.get("/:id", getSevaKendraById);
sevaKendraRouter.post("/", postSevaKendra);
sevaKendraRouter.put("/:id", putSevaKendra);
sevaKendraRouter.get("/districts/:districtId", getSevaKendraByDistrictId);

export default sevaKendraRouter;
