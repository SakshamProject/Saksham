import express from "express";
import { postMLAConstituency } from "../../../controllers/typeMaster/stateMaster/MLAConstituency/post.js";
import {
  getMLAConstituency,
  getMLAConstituencyByDistrictId,
  getMLAConstituencyById,
} from "../../../controllers/typeMaster/stateMaster/MLAConstituency/get.js";
import { putMLAConstituency } from "../../../controllers/typeMaster/stateMaster/MLAConstituency/put.js";
import { deleteMLAConstituency } from "../../../controllers/typeMaster/stateMaster/MLAConstituency/delete.js";

const MLAConstituencyRouter = express.Router();
MLAConstituencyRouter.post("/", postMLAConstituency);
MLAConstituencyRouter.get("/", getMLAConstituency);
MLAConstituencyRouter.get("/:id", getMLAConstituencyById);
MLAConstituencyRouter.put("/:id", putMLAConstituency);
MLAConstituencyRouter.delete("/:id", deleteMLAConstituency);
MLAConstituencyRouter.get(
  "/districts/:districtId",
  getMLAConstituencyByDistrictId
);
export default MLAConstituencyRouter;
