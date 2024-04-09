import express from "express";
import { postMPConstituency } from "../../../controllers/typeMaster/stateMaster/MPConstituency/post.js";
import {
  getMPConstituency,
  getMPConstituencyByDistrictId,
  getMPConstituencyById,
} from "../../../controllers/typeMaster/stateMaster/MPConstituency/get.js";
import { putMPConstituency } from "../../../controllers/typeMaster/stateMaster/MPConstituency/put.js";
import { deleteMPConstituency } from "../../../controllers/typeMaster/stateMaster/MPConstituency/delete.js";

const MPConstituencyRouter = express.Router();
MPConstituencyRouter.post("/", postMPConstituency);
MPConstituencyRouter.get("/", getMPConstituency);
MPConstituencyRouter.get("/:id", getMPConstituencyById);
MPConstituencyRouter.put("/:id", putMPConstituency);
MPConstituencyRouter.delete("/:id", deleteMPConstituency);
MPConstituencyRouter.get("/districts/:id", getMPConstituencyByDistrictId);
export default MPConstituencyRouter;
