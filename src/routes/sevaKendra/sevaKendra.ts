import express from "express";

import {
  getSevaKendra,
  getSevaKendraByDistrictId,
  getSevaKendraById,
} from "../../controllers/sevaKendra/get.js";
import putSevaKendra from "../../controllers/sevaKendra/put.js";
import postSevaKendra from "../../controllers/sevaKendra/post.js";
import { getUsersBySevaKendra } from "../../controllers/users/get.js";
import { authenticate } from "../../middlewares/authentication/authentication.js";
import { getDesignationsBySevaKendraId } from "../../controllers/designation/get.js";

const sevaKendraRouter = express.Router();

sevaKendraRouter.post("/list/", getSevaKendra);
sevaKendraRouter.get("/:id", getSevaKendraById);
sevaKendraRouter.post("/", postSevaKendra);
sevaKendraRouter.put("/:id", putSevaKendra);
sevaKendraRouter.get("/:id/users", getUsersBySevaKendra);
sevaKendraRouter.get("/:id/designations", getDesignationsBySevaKendraId);

// sevaKendraRouter.get("/districts/:districtId", getSevaKendraByDistrictId);

export default sevaKendraRouter;
